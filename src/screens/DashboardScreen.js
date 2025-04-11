import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db, doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from '../config/FirebaseConfig.js';
import axios from 'axios';

const DashboardScreen = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [history, setHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const saveChatHistory = async (messages) => {
    try {
      if (!userId) {
        console.log('Cannot save chat history: User ID is not available');
        return;
      }

      const userDocRef = doc(db, 'users', userId);
      const chatsCollectionRef = collection(userDocRef, 'chats');
      const currentTime = new Date();

      const docRef = await addDoc(chatsCollectionRef, {
        messages: messages,
        timestamp: serverTimestamp(),
        clientTimestamp: currentTime.toISOString()
      });

      const newHistoryItem = {
        id: docRef.id,
        messages: messages,
        timestamp: { toDate: () => currentTime },
        clientTimestamp: currentTime.toISOString()
      };

      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const startNewChat = () => {
    if (messages.length === 0) {
      Alert.alert('You are already in a new chat');
      return;
    }

    saveChatHistory(messages);
    setMessages([]);
    Alert.alert('Success', 'Chat is saved to history and entering new chat');
  };

  const fetchChatHistory = async () => {
    try {
      if (!userId) {
        console.log('User ID is not available yet');
        return;
      }

      const userDocRef = doc(db, 'users', userId);
      const chatsCollectionRef = collection(userDocRef, 'chats');
      const q = query(chatsCollectionRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map(docSnapshot => {
        const data = docSnapshot.data();
        if (!data.clientTimestamp && data.timestamp && typeof data.timestamp.toDate === 'function') {
          data.clientTimestamp = data.timestamp.toDate().toISOString();
        }
        return {
          id: docSnapshot.id,
          ...data
        };
      });
      setHistory(history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      if (!userId) {
        console.log('User ID is not available yet');
        return;
      }

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile({
          ...userData,
          displayName: userData.fullName || 'User',
          photoURL: userData.photoURL || null,
        });
      } else {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const basicProfile = {
            email: currentUser.email,
            displayName: currentUser.displayName || 'User',
            photoURL: currentUser.photoURL || null,
          };
          setUserProfile(basicProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await auth.signOut();
              Alert.alert('Success', 'Signed out successfully');
              navigation.navigate('Login');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    console.log('Current userId:', userId);
    fetchChatHistory();
    fetchUserProfile();
  }, [userId]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const currentTime = new Date();
    const newMessages = [...messages, { text: inputText, isUser: true, timestamp: currentTime }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await axios.post("https://5541-2409-40f4-1e-bc91-5d9d-80b0-a70-dfb0.ngrok-free.app/predict", {
        symptoms: inputText,
      });

      if (response.data.error) {
        setMessages((currentMessages) => [
          ...currentMessages,
          { text: response.data.error, isUser: false, timestamp: new Date() },
        ]);
        setIsLoading(false);
        return;
      }

      const predictions = response.data.predictions;

      let botResponse = '';
      if (predictions && predictions.length > 0) {
        botResponse = 'Here are the possible diseases:\n';
        predictions.forEach((prediction, index) => {
          botResponse += `${index + 1}. ${prediction.disease} (${prediction.probability})\n`;
          botResponse += `🩺 Recommended Action: ${prediction.recommendation}\n`;
          botResponse += `🌿 Home Remedy: ${prediction.remedy}\n\n`;
        });
      } else {
        botResponse = response.data.response || 'No matching diseases found. Please consult a doctor.';
      }

      const updatedMessages = [...newMessages, { text: botResponse, isUser: false }];
      setMessages(updatedMessages);

    } catch (error) {
      console.error('Error fetching predictions:', error);
      setMessages((currentMessages) => [
        ...currentMessages,
        { text: 'Sorry, something went wrong. Please try again.', isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>PreciseCure</Text>
        </View>
        {activeTab === 'Home' ? (
          <TouchableOpacity onPress={startNewChat}>
            <Icon name="comment" size={24} color="#4CAF50" />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton} />
        )}
      </View>

      {/* Messages Container */}
      {activeTab === 'Home' ? (
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[styles.message, message.isUser ? styles.userMessage : styles.botMessage]}
            >
              <Text style={message.isUser ? styles.userMessageText : styles.botMessageText}>
                {message.text}
              </Text>
              <Text style={styles.timestamp}>
                {message.timestamp ? formatTime(new Date(message.timestamp)) : ''}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.botMessage}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}
        </ScrollView>
      ) : activeTab === 'History' ? (
        // History Tab
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {history.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.historyItem}
              onPress={() => {
                setMessages(item.messages);
                setActiveTab('Home');
              }}
            >
              <Text style={styles.historyText}>
                Chat on {item.timestamp && item.timestamp.toDate ?
                  item.timestamp.toDate().toLocaleString() :
                  item.clientTimestamp ?
                    new Date(item.clientTimestamp).toLocaleString() :
                    'Recent chat'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        // Profile Tab
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.profileContent}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              {userProfile?.photoURL ? (
                <Image
                  source={{ uri: userProfile.photoURL }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Icon name="user" size={40} color="#4CAF50" />
                </View>
              )}
            </View>
            <Text style={styles.profileName}>
              {userProfile?.fullName || userProfile?.displayName || userProfile?.email || 'User'}
            </Text>
            <Text style={styles.profileEmail}>
              {userProfile?.email || ''}
            </Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.profileItem}>
              <Icon name="user" size={20} color="#4CAF50" style={styles.profileItemIcon} />
              <Text style={styles.profileItemText}>Name: {userProfile?.fullName || userProfile?.displayName || 'Not available'}</Text>
            </View>
            <View style={styles.profileItem}>
              <Icon name="envelope" size={20} color="#4CAF50" style={styles.profileItemIcon} />
              <Text style={styles.profileItemText}>Email: {userProfile?.email || 'Not available'}</Text>
            </View>
            <View style={styles.profileItem}>
              <Icon name="phone" size={20} color="#4CAF50" style={styles.profileItemIcon} />
              <Text style={styles.profileItemText}>Phone: {userProfile?.phoneNumber || 'Not available'}</Text>
            </View>
            <View style={styles.profileItem}>
              <Icon name="birthday-cake" size={20} color="#4CAF50" style={styles.profileItemIcon} />
              <Text style={styles.profileItemText}>Date of Birth: {userProfile?.dob || 'Not available'}</Text>
            </View>
            <View style={styles.profileItem}>
              <Icon name="calendar" size={20} color="#4CAF50" style={styles.profileItemIcon} />
              <Text style={styles.profileItemText}>
                Member since: {auth.currentUser?.metadata?.creationTime
                  ? new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()
                  : 'Not available'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Icon name="sign-out" size={20} color="#fff" />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Input Container */}
      {activeTab === 'Home' && (
        <View style={[styles.inputContainer, { backgroundColor: '#FFF' }]}>
          <TextInput
            style={styles.input}
            placeholder="Message PreciseCure..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name="send" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Home' && styles.activeTab]}
          onPress={() => setActiveTab('Home')}
        >
          <Icon name="home" size={24} color={activeTab === 'Home' ? '#4CAF50' : '#000'} />
          <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'History' && styles.activeTab]}
          onPress={() => setActiveTab('History')}
        >
          <Icon name="history" size={24} color={activeTab === 'History' ? '#4CAF50' : '#000'} />
          <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Profile' && styles.activeTab]}
          onPress={() => setActiveTab('Profile')}
        >
          <Icon name="user" size={24} color={activeTab === 'Profile' ? '#4CAF50' : '#000'} />
          <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  message: {
    maxWidth: '80%',
    padding: 11,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#acdc5a',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  tab: {
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 12,
    color: '#000',
  },
  activeTabText: {
    color: '#4CAF50',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  profileSection: {
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 13,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  profileItemIcon: {
    marginRight: 8,
  },
  profileItemText: {
    fontSize: 14,
    color: '#000',
  },
  signOutButton: {
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FF4500',
    borderRadius: 20,
    marginTop: 16,
    marginHorizontal: 16,
  },
  signOutButtonText: {
    color: '#FFF',
    marginLeft: 8,
  },
  historyItem: {
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  historyText: {
    fontSize: 14,
    color: '#000',
  },
  timestamp: {
  fontSize: 10,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default DashboardScreen;
