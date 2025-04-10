import { Note } from '@/types/notesData';
import { saveWidget } from '@/utils/store/slices/widgetSlice'; // Adjust path
import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

interface NotesWidgetProps {
  widgetId: string;
  initialNotes: Note[];
}

const NotesWidget = React.memo(
  ({ widgetId, initialNotes }: NotesWidgetProps) => {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState<Note[]>(initialNotes || []);
    const [newNote, setNewNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editNoteId, setEditNoteId] = useState<string | null>(null);

    const handleAddNote = () => {
      if (!newNote.trim()) return;

      const newNoteObj: Note = {
        id: Date.now().toString(),
        content: newNote,
      };

      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, newNoteObj];
        // Dispatch saveWidget with updated widget data after updating the state
        dispatch(saveWidget({ id: widgetId, data: updatedNotes }));
        return updatedNotes;
      });

      setNewNote('');
    };

    const handleDeleteNote = (id: string) => {
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note.id !== id);
        // Dispatch saveWidget with updated widget data after deleting the note
        dispatch(saveWidget({ id: widgetId, data: updatedNotes }));
        return updatedNotes;
      });
    };

    const handleEditNote = (id: string, content: string) => {
      setIsEditing(true);
      setEditNoteId(id);
      setNewNote(content);
    };

    const handleUpdateNote = () => {
      if (isEditing && editNoteId && newNote.trim()) {
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) =>
            note.id === editNoteId ? { ...note, content: newNote } : note
          );
          // Dispatch saveWidget with updated widget data after updating the note
          dispatch(saveWidget({ id: widgetId, data: updatedNotes }));
          return updatedNotes;
        });

        setIsEditing(false);
        setNewNote('');
        setEditNoteId(null);
      }
    };

    return (
      <>
        {/* Notes List */}
        <div className='space-y-2 mb-4'>
          {notes.map((note) => (
            <div
              key={note.id}
              className='flex items-center justify-between p-2 border-b border-gray-200'
            >
              <div>
                <p className='text-sm'>{note.content}</p>
              </div>
              <div className='space-x-2 flex'>
                <MdEdit
                  onClick={() => handleEditNote(note.id, note.content)}
                  className='text-gray-500 hover:text-gray-700'
                />
                <RxCross2
                  onClick={() => handleDeleteNote(note.id)}
                  className='text-gray-500 hover:text-gray-700'
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add or Edit Notes */}
        <div className='flex flex-col gap-2 mb-4'>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className='p-2 text-sm input'
            rows={1}
            placeholder='Add a new note'
          />
          <div className='flex justify-between gap-2'>
            <button
              onClick={isEditing ? handleUpdateNote : handleAddNote}
              className='btn-primary'
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewNote('');
                  setEditNoteId(null);
                }}
                className='btn-secondary'
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default NotesWidget;
