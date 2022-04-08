import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

const ChatList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setEmail(user?.email ?? "");
    });
  }, []);

  const createChat = async () => {
    if (!email || !userEmail) return;
    setIsLoading(true);
    await firebase
      .firestore()
      .collection("chats")
      .add({
        users: [email, userEmail],
      });
    setIsLoading(false);
    setIsDialogVisible(false);
    navigation.navigate("Chat");
  };
  useEffect(() => {
    return firebase
      .firestore()
      .collection("chats")
      .where("users", "array-contains", email)
      .onSnapshot((querySnapshot) => {
        setChats(querySnapshot.docs);
      });
  }, [email]);

  return (
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (
        <React.Fragment>
          <List.Item
            title={chat.data().users.find((x) => x !== email)}
            description="Hi !"
            left={() => (
              <Avatar.Text
                label={chat
                  .data()
                  .users.find((x) => x !== email)
                  .split(" ")
                  .reduce((prev, current) => prev + current[0], "")}
                size={56}
              />
            )}
          />
          <Divider inset />
        </React.Fragment>
      ))}
      <List.Item
        title="Asım KILIÇ"
        description="Hi !"
        left={() => <Avatar.Text label="AK" size={56} />}
      />
      <Divider inset />
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter user email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={() => createChat()} loading={isLoading}>
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => setIsDialogVisible(true)}
      />
    </View>
  );
};

export default ChatList;
