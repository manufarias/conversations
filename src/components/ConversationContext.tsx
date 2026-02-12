// Conversation context extraction and intelligent reply generation

export interface ConversationContext {
  specialty?: string;
  modality?: 'presencial' | 'virtual';
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
  doctorName?: string;
  appointmentReason?: string;
  urgency?: 'urgent' | 'routine';
  insuranceCoverage?: string;
  patientPreferences?: {
    timeOfDay?: 'mañana' | 'tarde';
    dayOfWeek?: string[];
  };
}

export interface EntityExtractionResult {
  entities: ConversationContext;
  intent: string;
  confidence: number;
}

/**
 * Extract entities and intent from operator messages
 */
export function extractEntitiesFromMessage(message: string, existingContext: ConversationContext = {}): EntityExtractionResult {
  const lowerMessage = message.toLowerCase();
  const entities: ConversationContext = { ...existingContext };
  let intent = 'unknown';
  let confidence = 0.5;

  // Extract specialty
  const specialties = ['cardiología', 'dermatología', 'traumatología', 'pediatría', 'oftalmología', 
                       'ginecología', 'neurología', 'nutrición', 'clínica médica', 'medicina general'];
  for (const specialty of specialties) {
    if (lowerMessage.includes(specialty)) {
      entities.specialty = specialty.charAt(0).toUpperCase() + specialty.slice(1);
      confidence = 0.8;
    }
  }

  // Extract modality
  if (lowerMessage.includes('presencial') || lowerMessage.includes('en persona')) {
    entities.modality = 'presencial';
    confidence = Math.max(confidence, 0.7);
  } else if (lowerMessage.includes('virtual') || lowerMessage.includes('videollamada') || lowerMessage.includes('telemedicina')) {
    entities.modality = 'virtual';
    confidence = Math.max(confidence, 0.7);
  }

  // Extract time preferences
  if (lowerMessage.includes('mañana')) {
    if (!entities.patientPreferences) entities.patientPreferences = {};
    entities.patientPreferences.timeOfDay = 'mañana';
  } else if (lowerMessage.includes('tarde')) {
    if (!entities.patientPreferences) entities.patientPreferences = {};
    entities.patientPreferences.timeOfDay = 'tarde';
  }

  // Extract time (HH:MM format)
  const timeMatch = lowerMessage.match(/(\d{1,2}):(\d{2})/);
  if (timeMatch) {
    entities.preferredTime = timeMatch[0];
    confidence = Math.max(confidence, 0.9);
  }

  // Extract dates
  const datePatterns = [
    /(\d{1,2})\/(\d{1,2})/,  // DD/MM
    /(lunes|martes|miércoles|miercoles|jueves|viernes|sábado|sabado|domingo)/,
    /(próxima semana|próximo|esta semana|mañana|pasado mañana)/
  ];
  
  for (const pattern of datePatterns) {
    const match = lowerMessage.match(pattern);
    if (match) {
      entities.preferredDate = match[0];
      confidence = Math.max(confidence, 0.7);
      break;
    }
  }

  // Extract location/sede
  const locations = ['sanatorio', 'centro médico', 'hospital', 'clínica'];
  for (const location of locations) {
    if (lowerMessage.includes(location)) {
      // Try to get the full location name
      const locationMatch = lowerMessage.match(new RegExp(`${location}[\\s\\w]+`, 'i'));
      if (locationMatch) {
        entities.location = locationMatch[0];
        confidence = Math.max(confidence, 0.7);
      }
    }
  }

  // Extract doctor name (looking for "Dr." or "Dra.")
  const doctorMatch = lowerMessage.match(/(dr\.|dra\.|doctor|doctora)\s+([a-záéíóúñ]+\s+[a-záéíóúñ]+)/i);
  if (doctorMatch) {
    entities.doctorName = doctorMatch[0].charAt(0).toUpperCase() + doctorMatch[0].slice(1);
    confidence = Math.max(confidence, 0.8);
  }

  // Detect intent
  if (lowerMessage.includes('especialidad') || lowerMessage.includes('qué tipo') || lowerMessage.includes('especialista')) {
    intent = 'ask_specialty';
    confidence = 0.9;
  } else if (lowerMessage.includes('fecha') || lowerMessage.includes('cuándo') || lowerMessage.includes('qué día') || lowerMessage.includes('disponibilidad')) {
    intent = 'ask_date';
    confidence = 0.9;
  } else if (lowerMessage.includes('hora') || lowerMessage.includes('horario') || lowerMessage.includes('qué hora')) {
    intent = 'ask_time';
    confidence = 0.9;
  } else if (lowerMessage.includes('sede') || lowerMessage.includes('dónde') || lowerMessage.includes('ubicación')) {
    intent = 'ask_location';
    confidence = 0.9;
  } else if (lowerMessage.includes('doctor') || lowerMessage.includes('médico') || lowerMessage.includes('profesional') || lowerMessage.includes('con quién')) {
    intent = 'ask_doctor';
    confidence = 0.9;
  } else if (lowerMessage.includes('confirmar') || lowerMessage.includes('confirmado') || lowerMessage.includes('agendado')) {
    intent = 'confirm_appointment';
    confidence = 0.9;
  } else if (lowerMessage.includes('presencial') || lowerMessage.includes('virtual') || lowerMessage.includes('modalidad')) {
    intent = 'ask_modality';
    confidence = 0.9;
  } else if (lowerMessage.includes('agendar') || lowerMessage.includes('cita') || lowerMessage.includes('turno') || lowerMessage.includes('programar')) {
    intent = 'schedule_appointment';
    confidence = 0.8;
  } else if (lowerMessage.includes('ayudar') || lowerMessage.includes('ayudo') || lowerMessage.includes('puedo ayudar')) {
    intent = 'offer_help';
    confidence = 0.7;
  }

  return { entities, intent, confidence };
}

/**
 * Generate contextual patient reply based on operator message and conversation context
 */
export function generateContextualReply(
  operatorMessage: string,
  context: ConversationContext,
  patientId: string,
  previousMessages: Array<{text: string, isOperator: boolean}>
): string {
  const extraction = extractEntitiesFromMessage(operatorMessage, context);
  const { intent } = extraction;

  // Check for multiple questions in one message
  const hasMultipleQuestions = (operatorMessage.match(/\?/g) || []).length > 1;

  switch (intent) {
    case 'ask_specialty':
      if (context.specialty) {
        return `${context.specialty}, por favor.`;
      }
      const specialtyOptions = [
        'Clínica médica, necesito un control general.',
        'Cardiología, tengo que hacer un seguimiento.',
        'Dermatología, tengo una consulta sobre unos lunares.',
        'Necesito medicina general para un chequeo de rutina.',
      ];
      return specialtyOptions[Math.floor(Math.random() * specialtyOptions.length)];

    case 'ask_date':
      if (context.preferredDate) {
        return `El ${context.preferredDate} me vendría bien.`;
      }
      if (context.patientPreferences?.timeOfDay) {
        return `¿Tiene disponibilidad la próxima semana? Preferiblemente en la ${context.patientPreferences.timeOfDay}.`;
      }
      const dateOptions = [
        '¿Tiene algo disponible la próxima semana? Cualquier día me viene bien.',
        'Preferiría lunes o martes si es posible.',
        'Esta semana o la próxima, lo que tenga disponible primero.',
        'Entre el 25 y 30 de este mes me vendría perfecto.',
      ];
      return dateOptions[Math.floor(Math.random() * dateOptions.length)];

    case 'ask_time':
      if (context.preferredTime) {
        return `Alrededor de las ${context.preferredTime} si es posible.`;
      }
      if (context.patientPreferences?.timeOfDay) {
        if (context.patientPreferences.timeOfDay === 'mañana') {
          return 'Prefiero en la mañana, entre 9 y 12 si hay disponibilidad.';
        } else {
          return 'Por la tarde me vendría mejor, después de las 14:00.';
        }
      }
      const timeOptions = [
        'Prefiero en la mañana, antes de las 12.',
        'Por la tarde estaría mejor para mí.',
        'En el horario que tenga disponible está bien.',
      ];
      return timeOptions[Math.floor(Math.random() * timeOptions.length)];

    case 'ask_location':
      if (context.location) {
        return `${context.location}, por favor.`;
      }
      return 'La más cercana a mi domicilio, o la que tenga disponibilidad primero.';

    case 'ask_doctor':
      if (context.doctorName) {
        return `Con ${context.doctorName} si está disponible.`;
      }
      if (patientId === '3') {
        return 'Preferiría con la Dra. Isabel Vargas si es posible, es mi médica de cabecera.';
      }
      const doctorOptions = [
        'Con mi médico de cabecera, por favor.',
        'El profesional que tenga disponibilidad más pronto está bien.',
        '¿Está disponible la Dra. Romero?',
      ];
      return doctorOptions[Math.floor(Math.random() * doctorOptions.length)];

    case 'ask_modality':
      if (context.modality) {
        return context.modality === 'presencial' ? 
          'Presencial, por favor.' : 
          'Prefiero virtual si es posible.';
      }
      return 'Presencial estaría bien, pero si hay algo más pronto por videollamada también me sirve.';

    case 'confirm_appointment':
      const confirmations = [
        '¡Perfecto! Muchas gracias por su ayuda.',
        '¡Excelente! Ahí estaré entonces.',
        'Perfecto, muchas gracias. ¿Me llegará una confirmación por email?',
        '¡Genial! Gracias por la ayuda.',
      ];
      return confirmations[Math.floor(Math.random() * confirmations.length)];

    case 'schedule_appointment':
      return 'Sí, necesito agendar una cita. ¿Me puede ayudar?';

    case 'offer_help':
      const helpResponses = [
        'Sí, necesito agendar una cita médica.',
        'Gracias, sí. Necesito programar una consulta.',
        'Claro, me gustaría agendar un turno.',
      ];
      return helpResponses[Math.floor(Math.random() * helpResponses.length)];

    default:
      // Handle multi-part questions by addressing the first one
      if (hasMultipleQuestions) {
        return 'Sí, adelante con las preguntas.';
      }

      // Greeting
      if (operatorMessage.toLowerCase().includes('hola') || 
          operatorMessage.toLowerCase().includes('buenos días') || 
          operatorMessage.toLowerCase().includes('buenas tardes')) {
        return '¡Hola! ¿Cómo está?';
      }

      // Generic clarification
      if (operatorMessage.includes('?')) {
        return 'Sí, exacto.';
      }

      // Acknowledgment
      const acknowledgments = [
        'Perfecto.',
        'Entendido.',
        'Sí, claro.',
        'De acuerdo.',
      ];
      return acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
  }
}

/**
 * Update conversation context with extracted entities
 */
export function updateContext(
  currentContext: ConversationContext,
  operatorMessage: string
): ConversationContext {
  const { entities } = extractEntitiesFromMessage(operatorMessage, currentContext);
  return entities;
}
