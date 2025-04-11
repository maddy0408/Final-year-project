// This is a mock implementation of the @react-native-voice/voice package
// Use this temporarily until you can install the actual package

// class MockVoice {
//   constructor() {
//     this.onSpeechStart = null;
//     this.onSpeechEnd = null;
//     this.onSpeechResults = null;
//     this.onSpeechError = null;
//     this._isRecognizing = false;
//     // Add this property to match the actual Voice API
//     this.isSpeechAvailable = true;
//   }

//   isAvailable() {
//     // Return a resolved promise to indicate voice is available
//     return Promise.resolve(true);
//   }

//   isRecognizing() {
//     return Promise.resolve(this._isRecognizing);
//   }

//   start(locale) {
//     this._isRecognizing = true;

//     // Simulate speech recognition starting
//     if (this.onSpeechStart) {
//       setTimeout(() => {
//         if (this.onSpeechStart) {
//           this.onSpeechStart();
//         }
//       }, 100);
//     }

//     // Simulate getting results after a delay
//     setTimeout(() => {
//       if (this._isRecognizing && this.onSpeechResults) {
//         this.onSpeechResults({
//           value: ['This is a simulated voice recognition result.']
//         });
//       }

//       // End the recognition after results
//       setTimeout(() => {
//         if (this._isRecognizing) {
//           this.stop();
//         }
//       }, 500);
//     }, 2000);

//     return Promise.resolve();
//   }

//   stop() {
//     this._isRecognizing = false;
    
//     if (this.onSpeechEnd) {
//       this.onSpeechEnd();
//     }
    
//     return Promise.resolve();
//   }

//   cancel() {
//     this._isRecognizing = false;
    
//     if (this.onSpeechError) {
//       this.onSpeechError({
//         error: {
//           message: 'Cancelled'
//         }
//       });
//     }
    
//     return Promise.resolve();
//   }

//   destroy() {
//     return Promise.resolve();
//   }

//   removeAllListeners() {
//     this.onSpeechStart = null;
//     this.onSpeechEnd = null;
//     this.onSpeechResults = null;
//     this.onSpeechError = null;
//     return Promise.resolve();
//   }
// }

// Export a singleton instance
// export default new MockVoice();// This is a mock implementation of the @react-native-voice/voice package
// Use this temporarily until you can install the actual package

class MockVoice {
  constructor() {
    this.onSpeechStart = null;
    this.onSpeechEnd = null;
    this.onSpeechResults = null;
    this.onSpeechError = null;
    this._isRecognizing = false;
  }

  isAvailable() {
    // Return a resolved promise to indicate voice is available
    return Promise.resolve();
  }

  isRecognizing() {
    return Promise.resolve(this._isRecognizing);
  }

  start(locale) {
    this._isRecognizing = true;
    
    // Simulate speech recognition starting
    if (this.onSpeechStart) {
      this.onSpeechStart();
    }
    
    // Simulate getting results after a delay
    setTimeout(() => {
      if (this.onSpeechResults) {
        this.onSpeechResults({
          value: ['This is a simulated voice recognition result.']
        });
      }
      
      // End the recognition after results
      setTimeout(() => {
        this.stop();
      }, 500);
    }, 2000);
    
    return Promise.resolve();
  }

  stop() {
    this._isRecognizing = false;
    
    if (this.onSpeechEnd) {
      this.onSpeechEnd();
    }
    
    return Promise.resolve();
  }

  cancel() {
    this._isRecognizing = false;
    
    if (this.onSpeechError) {
      this.onSpeechError({
        error: {
          message: 'Cancelled'
        }
      });
    }
    
    return Promise.resolve();
  }

  destroy() {
    return Promise.resolve();
  }

  removeAllListeners() {
    this.onSpeechStart = null;
    this.onSpeechEnd = null;
    this.onSpeechResults = null;
    this.onSpeechError = null;
    return Promise.resolve();
  }
}

// Export a singleton instance
export default new MockVoice();