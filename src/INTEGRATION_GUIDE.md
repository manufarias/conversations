# Integration Guide - Enhanced Chat Features

This guide shows how to integrate the new chat features into the existing application.

## Quick Start

All the necessary components have been created. Here's how to wire them together:

### 1. Update ConversationView.tsx

Replace the existing slash command handling with the enhanced version:

```typescript
import { EnhancedSlashCommandMenu, parseSlashCommand } from "./EnhancedSlashCommandMenu";
import { InlineNoteComposer } from "./InlineNoteComposer";
import { QuickActionsMenu } from "./QuickActionsMenu";

// Add new props to ConversationViewProps
interface ConversationViewProps {
  // ... existing props
  onOpenTurno?: (params?: { specialty?: string; time?: string; modality?: string }) => void;
  onCreateNote?: (text: string) => void;
  onTogglePin?: () => void;
  onToggleMute?: () => void;
  isPinned?: boolean;
  isMuted?: boolean;
}

// Add state for note composer
const [showNoteComposer, setShowNoteComposer] = useState(false);

// Handle slash command selection
const handleSlashCommandSelect = (command: SlashCommand, parameters?: string) => {
  if (command.action === 'open_turno') {
    const { params } = parseSlashCommand(`/turno ${parameters || ''}`);
    onOpenTurno?.(params);
  } else if (command.action === 'create_nota') {
    const { params } = parseSlashCommand(`/nota ${parameters || ''}`);
    if (params.text) {
      onCreateNote?.(params.text);
    } else {
      setShowNoteComposer(true);
    }
  } else if (command.action === 'pin_conversation') {
    onTogglePin?.();
  } else if (command.text) {
    setMessageText(command.text);
  }
  
  setShowSlashMenu(false);
};

// In the JSX, replace SlashCommandMenu with EnhancedSlashCommandMenu
{showSlashMenu && (
  <EnhancedSlashCommandMenu
    searchQuery={slashSearchQuery}
    selectedIndex={selectedCommandIndex}
    onSelect={handleSlashCommandSelect}
  />
)}

// Add QuickActionsMenu to the header
<QuickActionsMenu
  isPinned={isPinned}
  isMuted={isMuted}
  onOpenTurno={() => onOpenTurno?.({})}
  onCreateNote={() => setShowNoteComposer(true)}
  onTogglePin={onTogglePin}
  onToggleMute={onToggleMute}
  onMarkResolved={() => onStatusChange("Resolved")}
/>

// Add InlineNoteComposer after the messages area
{showNoteComposer && (
  <InlineNoteComposer
    onSave={(text) => {
      onCreateNote?.(text);
      setShowNoteComposer(false);
    }}
    onCancel={() => setShowNoteComposer(false)}
  />
)}
```

### 2. Update PatientTimeline.tsx

Add support for displaying internal notes:

```typescript
import { InternalNoteMessage, InternalNote } from "./InternalNoteMessage";

// Add notes prop
interface PatientTimelineProps {
  // ... existing props
  internalNotes?: InternalNote[];
}

// In the messages rendering
{messages.map((message) => (
  // ... existing message rendering
))}

{/* Render internal notes */}
{internalNotes?.map((note) => (
  <InternalNoteMessage key={note.id} note={note} />
))}
```

### 3. Wire Up in App.tsx

The state management is already added. Now connect the handlers:

```typescript
// In the JSX where ConversationView is rendered
<ConversationView
  // ... existing props
  onOpenTurno={(params) => {
    // Open turno panel with prefilled data from context
    const context = conversationContexts[activePatientId] || {};
    const mergedParams = { ...context, ...params };
    setTurnoBookingOpen(true);
    setTurnoBookingParams(mergedParams);
  }}
  onCreateNote={(text) => {
    if (activePatientId) {
      handleCreateNote(activePatientId, text);
    }
  }}
  onTogglePin={() => {
    if (activePatientId) {
      handleTogglePin(activePatientId);
    }
  }}
  onToggleMute={() => {
    if (activePatientId) {
      handleToggleMute(activePatientId);
    }
  }}
  isPinned={activePatientId ? pinnedConversations.has(activePatientId) : false}
  isMuted={activePatientId ? mutedConversations.has(activePatientId) : false}
/>

// Pass notes to PatientTimeline
<PatientTimeline
  // ... existing props
  internalNotes={activePatientId ? internalNotes[activePatientId] : []}
/>
```

### 4. Update AppointmentBookingFlow.tsx

Add props to receive prefilled context:

```typescript
interface AppointmentBookingFlowProps {
  // ... existing props
  prefilledData?: {
    specialty?: string;
    time?: string;
    modality?: 'presencial' | 'virtual';
  };
}

// Use prefilledData to initialize state
const [appointmentData, setAppointmentData] = useState<AppointmentDetails>({
  patient: patientName,
  coverage: "Plan Austral",
  specialty: prefilledData?.specialty || "",
  type: prefilledData?.modality || "presencial",
});

// If time is provided, use it for selectedTime
const [selectedTime, setSelectedTime] = useState<string | null>(
  prefilledData?.time || null
);
```

## Testing the Integration

### Test Context-Aware Replies

1. Send: "¿Qué especialidad necesita?"
2. Patient should respond with a specialty
3. Send: "¿Qué día prefiere?"
4. Patient should respond with date preference
5. Context is maintained across messages

### Test /turno Command

1. Type `/turno`
2. Menu should appear with /turno option
3. Press Enter or click
4. Turno panel should open on the right
5. Chat should remain active (50% width)

**With parameters:**
1. Type `/turno cardiología 15:30 presencial`
2. Press Enter
3. Panel opens with all fields prefilled

### Test /nota Command

1. Type `/nota`
2. Press Enter
3. Note composer should appear at bottom
4. Type note text
5. Press ⌘Enter or click "Guardar"
6. Note appears in timeline with yellow background

**Quick note:**
1. Type `/nota Patient seems anxious`
2. Press Enter
3. Note is created immediately

### Test Pin/Unpin

1. Click ⋮ (more menu) in conversation header
2. Click "Fijar conversación"
3. Conversation should move to top of list
4. Pin icon 📌 should appear next to name
5. Click again to unpin
6. Conversation returns to normal position

### Test Quick Actions Menu

1. Click ⋮ in conversation header
2. Type "turno" in search box
3. Only turno-related actions should show
4. Use arrow keys to navigate
5. Press Enter to select
6. Action should execute

## Keyboard Shortcuts Cheat Sheet

| Shortcut | Action |
|----------|--------|
| `⌘T` | Open /turno |
| `⌘N` | Create /nota |
| `⌘P` | Pin/Unpin conversation |
| `⌘M` | Mute/Unmute notifications |
| `⌘R` | Mark as resolved |
| `⌘E` | Insert empathy message |
| `⌘S` | Insert greeting |
| `Enter` | Confirm/Send |
| `Esc` | Cancel |
| `↑`/`↓` | Navigate menus |

## Common Issues & Solutions

### Issue: Slash commands not appearing
**Solution**: Make sure EnhancedSlashCommandMenu is imported and the showSlashMenu state is properly toggled when typing "/"

### Issue: Context not being extracted
**Solution**: Verify that the generatePatientResponse function is calling updateContext and generateContextualReply

### Issue: Notes not showing
**Solution**: Check that internalNotes state is being passed to PatientTimeline and InternalNoteMessage component is rendering

### Issue: Pin not persisting
**Solution**: Pinned conversations are in memory only. To persist, save pinnedConversations Set to localStorage:
```typescript
useEffect(() => {
  localStorage.setItem('pinnedConversations', JSON.stringify(Array.from(pinnedConversations)));
}, [pinnedConversations]);
```

### Issue: Turno panel not prefilling
**Solution**: Ensure conversation context is being extracted and passed to AppointmentBookingFlow via prefilledData prop

## Performance Considerations

### Optimizations Already Implemented
- Slash command filtering is debounced
- Context extraction only runs on operator messages
- Pin state uses Set for O(1) lookups
- Notes are stored per conversation to reduce memory

### Additional Optimizations (Optional)
```typescript
// Memoize expensive computations
const filteredCommands = useMemo(() => 
  getFilteredEnhancedCommands(slashSearchQuery),
  [slashSearchQuery]
);

// Debounce search in quick actions
const debouncedSearch = useMemo(() => 
  debounce((value: string) => setSearchQuery(value), 300),
  []
);
```

## Accessibility Checklist

- [ ] All slash commands keyboard navigable
- [ ] Quick actions menu keyboard navigable
- [ ] Pin icon has aria-label
- [ ] Notes have proper heading structure
- [ ] Slash command menu announces results count
- [ ] Shortcuts documented and visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible on all interactive elements

## Next Steps

1. Test all features in different browsers
2. Add unit tests for context extraction
3. Add integration tests for slash commands
4. Document any custom slash commands added
5. Train operators on new keyboard shortcuts
6. Monitor context extraction accuracy
7. Gather user feedback on UX improvements

## Support

If you encounter issues during integration:
1. Check this guide first
2. Review component source code
3. Check FEATURES.md for detailed feature documentation
4. Review console for error messages
5. Verify all imports are correct
