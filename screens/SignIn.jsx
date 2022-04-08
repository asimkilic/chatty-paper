import React, { useState, useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    try {
     await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };
  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading
          style={{ color: "red", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginTop: 12 }}
      
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={{ marginTop: 12 }}
        secureTextEntry
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact onPress={() => navigation.navigate("SignUp")}>
          SIGN UP
        </Button>
        <Button mode="contained" onPress={() => signIn()} loading={isLoading}>
          SIGN IN
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
