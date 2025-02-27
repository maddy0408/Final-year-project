import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for icons

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message to the list
    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');

    // Simulate chatbot response
    setTimeout(() => {
      const response = `Bot: I received your message: "${inputText}"`;
      setMessages(currentMessages => [...currentMessages, { text: response, isUser: false }]);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Icon name="bars" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.message, message.isUser ? styles.userMessage : styles.botMessage]}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatContainer}>
        <TextInput
          style={styles.chatinput}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    color: '#fff',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  chatinput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chatbot;