# Healthcare Help Desk Chat - Enhanced Features

## Overview
Comprehensive enhancements to the chat interface including context-aware patient replies, slash commands for quick actions, internal notes, conversation pinning, and an improved quick actions menu.

## 1. Conversational Realism (Context-Aware Patient Replies)

### Features
- **Entity Extraction**: Automatically extracts key information from operator messages:
  - Specialty/service (e.g., "Cardiología", "Pediatría")
  - Appointment modality (presencial/virtual)
  - Preferred dates and times
  - Location/sede preferences
  - Doctor names
  - Time of day preferences (mañana/tarde)

- **Context Maintenance**: Conversation context is preserved and used across messages
- **Intent Detection**: Identifies operator's intent (ask_specialty, ask_date, ask_time, etc.)
- **Natural Responses**: Generates contextual, relevant patient replies instead of generic responses

### Implementation
```typescript
// Context is automatically extracted and maintained
const context = {
  specialty: "Cardiología",
  modality: "presencial",
  preferredTime: "15:30",
  patientPreferences: {
    timeOfDay: "mañana"
  }
};

// Patient replies use this context
Operator: "¿Qué especialidad necesita?"
Patient: "Cardiología, tengo que hacer un seguimiento." // Uses context
```

### Components
- `/components/ConversationContext.tsx` - Context extraction and reply generation
- Entity extraction happens automatically on every operator message
- Context persists across conversation

## 2. Slash Commands

### /turno - Open Appointment Booking Flow

**Usage:**
```
/turno
/turno cardiología  
/turno cardiología 15:30 presencial
```

**Features:**
- Opens Turno booking panel on the right side (side-by-side with chat)
- Prefills booking form with extracted context from conversation
- Supports inline parameters for quick booking
- Chat remains fully active while panel is open

**Parameters:**
- `specialty` - Medical specialty (extracted as first text parameter)
- `time` - Appointment time in HH:MM format
- `modality` - `presencial` or `virtual`

**Keyboard Shortcuts:**
- `⌘T` - Quick access to /turno
- `Enter` - Confirm command
- `Esc` - Cancel command entry

### /nota - Create Internal Note

**Usage:**
```
/nota
/nota Paciente reporta dolor en rodilla izquierda
```

**Features:**
- Creates internal notes visible only to operators
- Inline composer for quick note creation
- Supports basic formatting (negrita con **texto**, viñetas con •)
- Notes appear in timeline with amber/yellow styling
- Includes author and timestamp

**Keyboard Shortcuts:**
- `⌘N` - Quick access to /nota
- `⌘Enter` - Save note
- `Esc` - Cancel note creation

**Note Appearance:**
- Light yellow background (`bg-amber-50`)
- Clear "Solo visible para operadores" indicator
- Author name and timestamp
- Sticky note icon for quick identification

### All Available Slash Commands

**Messaging:**
- `/saludo` (⌘S) - Welcome message template
- `/contraseña` - Password reset instructions
- `/resultados` - Lab results information
- `/empatia` (⌘E) - Empathy/acknowledgment message
- `/transferir` - Transfer to another department

**Turnos:**
- `/turno` (⌘T) - Open appointment booking flow

**Notas & Eventos:**
- `/nota` (⌘N) - Create internal note
- `/cerrar` (⌘R) - Mark conversation as resolved

**Conversación:**
- `/pin` (⌘P) - Pin/unpin conversation
- `/silenciar` (⌘M) - Mute/unmute notifications
- `/archivar` - Archive conversation

### Slash Command Menu Features
- **Grouped by Category**: Commands organized into logical groups
- **Searchable**: Type-to-filter within the menu
- **Keyboard Navigation**: ↑/↓ to navigate, Enter to select, Esc to cancel
- **Visual Shortcuts**: Keyboard shortcuts displayed for quick access
- **ARIA-friendly**: Fully accessible with screen readers

## 3. Pin/Unpin Conversations

### Features
- Pin important conversations to the top of the list
- Pin icon displayed next to pinned conversation names
- Pinned state persists across sessions
- Smooth animations when reordering
- Available via `/pin` command or quick actions menu

### Usage
- Click "Fijar conversación" in quick actions menu
- Use `/pin` slash command
- Keyboard shortcut: `⌘P`

### Visual Indicators
- 📌 Pin icon next to conversation name
- Pinned conversations always appear first in list
- Maintains sort order within pinned/unpinned groups

## 4. Quick Actions Menu (Enhanced)

### Features
- **Grouped Actions**: Organized into 4 categories
  1. **Mensajería**: Reply, Quick templates, Attach file
  2. **Turnos**: Open /turno, Reschedule, Cancel
  3. **Notas & Eventos**: /nota, Add status, Mark resolved
  4. **Conversación**: Pin/Unpin, Mute/Unmute, Archive

- **Search Within Menu**: Type to filter actions instantly
- **Keyboard Navigation**: Full keyboard support (↑/↓/Enter/Esc)
- **Visual Shortcuts**: Keyboard shortcuts displayed for each action
- **Context-Aware**: Shows "Desfijar" if pinned, "Fijar" if not
- **Responsive**: Popover on desktop, bottom sheet on mobile

### Keyboard Shortcuts
- `⌘R` - Reply
- `⌘K` - Quick reply templates
- `⌘T` - Open /turno
- `⌘N` - Create /nota
- `⌘P` - Pin/Unpin
- `⌘M` - Mute/Unmute
- `⌘⇧R` - Mark as resolved

### Usage
1. Click ⋮ (three dots) in conversation header
2. Type to search actions
3. Use arrow keys to navigate
4. Press Enter to select
5. Or click directly on any action

## 5. Internal Notes System

### Components
- **InternalNoteMessage**: Displays notes in timeline
- **InlineNoteComposer**: Inline note creation interface

### Note Features
- Yellow/amber styling for easy identification
- Clear "Solo visible para operadores" label
- Author name and timestamp
- Support for basic text formatting:
  - `**texto**` for bold
  - `•` for bullet points
- Appears in conversation timeline alongside messages
- Included in "show/hide system events" toggle

### Creating Notes
1. Via slash command: `/nota [texto]`
2. Via quick actions menu: "Crear nota interna"
3. Keyboard shortcut: `⌘N`

### Note Persistence
- Stored per conversation
- Persists across sessions
- Can be toggled on/off with system events filter

## 6. Conversation Context Extraction

### Automatic Entity Recognition
The system automatically extracts and remembers:

**Appointment Details:**
- Specialty/service requested
- Doctor preferences
- Date preferences (specific dates, days of week, relative dates)
- Time preferences (specific times, time of day)
- Location/sede preferences
- Modality (presencial/virtual)

**Patient Preferences:**
- Time of day (morning/afternoon)
- Days of week
- Urgency level

### Context Usage
- Prefills Turno booking flow automatically
- Generates more relevant patient responses
- Maintains conversation state across multiple messages
- Reduces repetition and improves efficiency

## Technical Implementation

### New Components
1. `ConversationContext.tsx` - Context extraction engine
2. `EnhancedSlashCommandMenu.tsx` - Advanced slash command system
3. `InternalNoteMessage.tsx` - Note display component
4. `InlineNoteComposer.tsx` - Note creation UI
5. `QuickActionsMenu.tsx` - Enhanced quick actions

### State Management
```typescript
// New state in App.tsx
const [pinnedConversations, setPinnedConversations] = useState<Set<string>>(new Set());
const [mutedConversations, setMutedConversations] = useState<Set<string>>(new Set());
const [conversationContexts, setConversationContexts] = useState<Record<string, ConversationContext>>({});
const [internalNotes, setInternalNotes] = useState<Record<string, InternalNote[]>>({});
```

### Integration Points
1. **App.tsx** - Main state and context management
2. **ConversationView.tsx** - Slash command handling
3. **ChatList.tsx** - Pin indicator and sorting
4. **PatientTimeline.tsx** - Note display

## User Experience Improvements

### Natural Conversation Flow
- Context-aware responses feel more human
- Less repetition of information
- Faster appointment booking via /turno prefill
- Smooth transitions between topics

### Operator Efficiency
- Quick access to common actions via slash commands
- Keyboard shortcuts for power users
- Search within actions menu
- Internal notes for team communication
- Pin important conversations

### Visual Hierarchy
- Consistent with Osana design system
- Clear visual indicators (pin icons, note styling)
- Smooth animations and transitions
- Responsive behavior across devices

## Accessibility

### Keyboard Support
- Full keyboard navigation for all features
- Logical tab order
- Escape key cancels operations
- Enter confirms actions

### Screen Readers
- ARIA labels on all interactive elements
- Proper heading hierarchy
- Status announcements for important actions
- Semantic HTML structure

## Future Enhancements

### Planned Features
1. **Advanced Note Formatting**: Rich text editor with full markdown support
2. **Note Tagging**: Categorize notes with tags
3. **Multi-language Support**: Automatic language detection and response
4. **Smart Suggestions**: AI-powered response suggestions based on context
5. **Template Library**: Customizable message templates
6. **Conversation Analytics**: Track context extraction accuracy

### Performance Optimizations
- Lazy loading for slash command menu
- Debounced search in quick actions
- Optimized re-renders for large conversation lists
- Context caching to reduce computation

## Development Notes

### Adding New Slash Commands
```typescript
// In EnhancedSlashCommandMenu.tsx
{
  name: "Command Name",
  trigger: "command",
  description: "What this command does",
  icon: <Icon className="h-4 w-4" />,
  category: "messaging" | "turnos" | "notas" | "conversation",
  action: "custom_action", // optional
  shortcut: "⌘X", // optional
  allowsParameters: true, // optional
}
```

### Extending Context Extraction
```typescript
// In ConversationContext.tsx
// Add new entity patterns in extractEntitiesFromMessage()
const newPattern = /your-regex-pattern/;
if (lowerMessage.match(newPattern)) {
  entities.newField = extractedValue;
}
```

## Testing

### Manual Test Scenarios
1. **Context Extraction**:
   - Operator mentions specialty → Patient responds with same specialty
   - Operator asks about time → Patient uses previously mentioned preference

2. **Slash Commands**:
   - `/turno cardiología 15:30` prefills all fields correctly
   - `/nota Quick note text` creates note immediately
   - `/pin` moves conversation to top of list

3. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Arrow keys navigate slash command menu
   - Shortcuts work as expected

4. **Responsive Behavior**:
   - Quick actions menu adapts to screen size
   - Slash command menu works on mobile
   - Pin icon visible at all breakpoints

## Support

For questions or issues with these features, consult:
- Component source code in `/components/`
- This documentation
- Design system guidelines in `/guidelines/Guidelines.md`
