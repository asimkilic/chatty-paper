import React, { useState, useEffect } from "react";
import { Text, View, BackHandler } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [name, setName] = useState("");
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

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      setIsLoading(false);
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
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginTop: 12 }}
        keyboardType="email-address"
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
        <Button compact onPress={() => navigation.navigate("SignIn")}>
          SIGN IN
        </Button>
        <Button
          mode="contained"
          onPress={() => createAccount()}
          loading={isLoading}
        >
          SIGN UP
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
