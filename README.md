# Chatty-Paper

<p align="right"><a href="#screens">Ekran Görüntüleri >></a></p>



Proje oluşturulması:

```powershell
npx expo init Chatty-Paper
```

[React Navigation](https://reactnavigation.org/docs/getting-started/) Setup:

```powershell
yarn add @react-navigation/native
```

Expo kullanıldığından ekstra olarak 2 paket daha kuruyoruz

```powershell
expo install react-native-screens react-native-safe-area-context
```

[Tab Navigation](https://reactnavigation.org/docs/tab-based-navigation) için

```powershell
yarn add @react-navigation/bottom-tabs
```

[Stack Navigation](https://reactnavigation.org/docs/hello-react-navigation) için:

```powershell
yarn add @react-navigation/native-stack
```

[React Native Paper](https://callstack.github.io/react-native-paper/getting-started.html)

```powershell
yarn add react-native-paper
# Normal React Native Projesi ise ekstra paketler:
yarn add react-native-vector-icons
react-native link react-native-vector-icons
```

Geri tuşunun disable edilmesi:

```react
import {  BackHandler } from 'react-native'  
useEffect(()=>{
    BackHandler
        .addEventListener('hardwareBackPress', function () { return true })
  },[])
```

[Firebase](https://docs.expo.dev/guides/using-firebase/)

```powershell
expo install firebase
```

[Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

```powershell
yarn add react-native-gifted-chat
```



# Icons

[ionic.io](https://ionic.io/ionicons)



## Screens

<div id="screens"></div>
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/SignUp.jpeg" />
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/SignIn.jpeg" />
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/SignOut.jpeg" />
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/NewChat.jpeg" />
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/ChatDetail.jpeg" />
<img src="https://raw.githubusercontent.com/asimkilic/chatty-paper/master/assets/ChatList.jpeg" />