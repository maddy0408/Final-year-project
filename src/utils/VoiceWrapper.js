/**
 * A wrapper for the @react-native-voice/voice package that handles errors gracefully
 */

// Try to import the Voice module, but handle any errors
let Voice = null;
try {
  Voice = require('@react-native-voice/voice').default;
} catch (error) {
  console.error('Failed to import Voice module:', error);
}

// Create a wrapper with safe methods
const VoiceWrapper = {
  // Check if Voice is available
  isAvailable: async () => {
    if (!Voice) return false;
    
    try {
      if (typeof Voice.isAvailable === 'function') {
        return await Voice.isAvailable();
      }
      return false;
    } catch (error) {
      console.error('Error checking Voice availability:', error);
      return false;
    }
  },
  
  // Start voice recognition
  start: async (locale = 'en-US') => {
    if (!Voice) throw new Error('Voice module not available');
    
    if (typeof Voice.start !== 'function') {
      throw new Error('Voice.start is not a function');
    }
    
    return await Voice.start(locale);
  },
  
  // Stop voice recognition
  stop: async () => {
    if (!Voice) return;
    
    if (typeof Voice.stop === 'function') {
      try {
        await Voice.stop();
      } catch (error) {
        console.error('Error stopping voice recognition:', error);
      }
    }
  },
  
  // Check if voice recognition is running
  isRecognizing: async () => {
    if (!Voice) return false;
    
    try {
      if (typeof Voice.isRecognizing === 'function') {
        return await Voice.isRecognizing();
      }
      return false;
    } catch (error) {
      console.error('Error checking if recognizing:', error);
      return false;
    }
  },
  
  // Destroy voice instance
  destroy: async () => {
    if (!Voice) return;
    
    try {
      if (typeof Voice.destroy === 'function') {
        await Voice.destroy();
      }
    } catch (error) {
      console.error('Error destroying Voice instance:', error);
    }
  },
  
  // Set event handlers
  setHandlers: (handlers) => {
    if (!Voice) return;
    
    try {
      if (handlers.onSpeechStart && typeof Voice.onSpeechStart !== 'undefined') {
        Voice.onSpeechStart = handlers.onSpeechStart;
      }
      
      if (handlers.onSpeechEnd && typeof Voice.onSpeechEnd !== 'undefined') {
        Voice.onSpeechEnd = handlers.onSpeechEnd;
      }
      
      if (handlers.onSpeechResults && typeof Voice.onSpeechResults !== 'undefined') {
        Voice.onSpeechResults = handlers.onSpeechResults;
      }
      
      if (handlers.onSpeechError && typeof Voice.onSpeechError !== 'undefined') {
        Voice.onSpeechError = handlers.onSpeechError;
      }
    } catch (error) {
      console.error('Error setting Voice handlers:', error);
    }
  },
  
  // Remove all listeners
  removeAllListeners: () => {
    if (!Voice) return;
    
    try {
      if (typeof Voice.removeAllListeners === 'function') {
        Voice.removeAllListeners();
      }
    } catch (error) {
      console.error('Error removing Voice listeners:', error);
    }
  }
};

export default VoiceWrapper;