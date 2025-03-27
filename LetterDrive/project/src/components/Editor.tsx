import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { saveToGoogleDrive } from '../lib/google-drive';
import { useState } from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const [title, setTitle] = useState('Untitled Letter');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleSave = async () => {
    if (!editor) return;
    
    try {
      setSaving(true);
      setError(null);
      const fileId = await saveToGoogleDrive(editor.getHTML(), title);
      setDocUrl(`https://docs.google.com/document/d/${fileId}/edit`);
      alert('Successfully saved to Google Drive!');
    } catch (error: any) {
      console.error('Error saving to Google Drive:', error);
      setError(error.message || 'Error saving to Google Drive');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none focus:outline-none focus:ring-0"
          placeholder="Untitled Letter"
        />
        <div className="flex gap-2">
          {docUrl && (
            <a
              href={docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Open in Google Docs
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save to Drive'}
          </button>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="min-h-[500px] w-full border border-gray-200 rounded-lg p-4">
        <EditorContent editor={editor} className="prose max-w-none" />
      </div>
    </div>
  );
}