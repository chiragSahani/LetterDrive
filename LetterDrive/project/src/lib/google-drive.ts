import { gapi } from 'gapi-script';

const CLIENT_ID = '300446645880-7vn6nat1sqbrlhfi44fgpq707kt7jl01.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBtRvtgqtXro4uk0mFi-2gC4P1BPGCKZnU';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let isInitialized = false;

export const initGoogleDrive = async () => {
  if (isInitialized) return;

  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        });
        isInitialized = true;
        resolve(true);
      } catch (error) {
        console.error('Error initializing Google API client:', error);
        reject(error);
      }
    });
  });
};

export const saveToGoogleDrive = async (content: string, title: string) => {
  try {
    // First ensure we're initialized and signed in
    if (!isInitialized) {
      await initGoogleDrive();
    }

    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }

    // Create the file metadata for Google Docs
    const metadata = {
      name: `${title}.gdoc`,
      mimeType: 'application/vnd.google-apps.document',
    };

    // Convert HTML content to plain text for initial upload
    const tempContent = content.replace(/<[^>]+>/g, ' ').trim();

    // First create an empty Google Doc
    const response = await gapi.client.drive.files.create({
      resource: metadata,
      media: {
        mimeType: 'text/plain',
        body: tempContent
      },
      fields: 'id'
    });

    const fileId = response.result.id;

    // Now update the document with proper formatting using Google Docs API
    await gapi.client.request({
      path: `https://docs.googleapis.com/v1/documents/${fileId}/batchUpdate`,
      method: 'POST',
      body: {
        requests: [
          {
            insertText: {
              location: {
                index: 1
              },
              text: content
            }
          }
        ]
      }
    });

    return fileId;
  } catch (error) {
    console.error('Error saving to Google Drive:', error);
    throw new Error('Failed to save to Google Drive. Please ensure you are signed in and try again.');
  }
};