import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/utils/snack_bar.dart';
import 'package:short_video_sharing_app/views/widgets/button.dart';
import 'package:short_video_sharing_app/views/widgets/text_box.dart';
import 'package:short_video_sharing_app/views/screens/mobile/home_screen.dart';

enum _OnboardingScreens { login, signup, forgotPassword }

class MobileOnBoardingScreen extends StatefulWidget {
  const MobileOnBoardingScreen({super.key});

  @override
  State<MobileOnBoardingScreen> createState() => _MobileOnBoardingScreenState();
}

class _MobileOnBoardingScreenState extends State<MobileOnBoardingScreen> {
  final TextEditingController _name = TextEditingController();
  _OnboardingScreens _currentScreen = _OnboardingScreens.login;
  final TextEditingController _username = TextEditingController();
  final TextEditingController _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 20),
          if (_currentScreen == _OnboardingScreens.login)
            Column(
              children: [
                Text(
                  'Login',
                  style: TextStyle(fontSize: 20),
                ),
                SizedBox(height: 20),
                TextBox(
                  controller: _username,
                  labelText: 'Username',
                  icon: Icons.person_outlined,
                ),
                TextBox(
                  isObscure: true,
                  controller: _password,
                  labelText: 'Password',
                  icon: Icons.password_outlined,
                ),
                Button(
                    text: 'Login',
                    onTap: () async {
                      String response = await authController.loginUser(
                          _username.text, _password.text);
                      switch (response) {
                        case 'SUCCESS':
                          showSnackBar(
                              'Login Successfull, Redirecting to Home Screen..',
                              2);
                          Navigator.pushReplacement(
                            currentScreenContext!,
                            MaterialPageRoute(
                                builder: (currentScreenContext) =>
                                    const MobileHomeScreen()),
                          );
                          break;
                        case 'SOMETHING WENT WRONG AT OUR END':
                          showSnackBar(
                              'Something went wrong at our end. Please Try again after some time.',
                              2);
                          break;
                        case 'USER DOES NOT EXISTS':
                          showSnackBar('No User Found with this Username.', 2);
                          break;
                        case 'WRONG PASSWORD':
                          showSnackBar('Password Entered is Incorrect.', 2);
                          break;
                        case 'INVALID RESPONSE':
                          showSnackBar(
                              'Invalid Response, Try again after some time.',
                              2);
                          break;
                        case 'PLEASE FILL ALL THE FIELDS':
                          showSnackBar('Please Fill All the Fields.', 2);
                          break;
                        default:
                          showSnackBar('Something Went Wrong: $response', 2);
                      }
                    }),
                InkWell(
                  onTap: () {
                    setState(() {
                      _currentScreen = _OnboardingScreens.forgotPassword;
                    });
                  },
                  child: Text(
                    'Forgot Password?',
                    style: TextStyle(
                      color: Colors.blue,
                      fontSize: 16,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                Divider(
                  color: Colors.grey[400],
                  thickness: 1,
                  indent: 20,
                  endIndent: 20,
                ),
                SizedBox(height: 20),
                Button(
                  text: 'Create new account',
                  onTap: () {
                    setState(() {
                      _currentScreen = _OnboardingScreens.signup;
                    });
                  },
                  backgroundColor: Colors.green,
                ),
              ],
            ),
          if (_currentScreen == _OnboardingScreens.signup)
            Column(
              children: [
                Text(
                  'Signup',
                  style: TextStyle(fontSize: 20),
                ),
                SizedBox(height: 20),
                TextBox(
                  controller: _name,
                  labelText: 'Name',
                ),
                TextBox(
                  controller: _username,
                  labelText: 'Username',
                  icon: Icons.person_outlined,
                ),
                TextBox(
                  isObscure: true,
                  controller: _password,
                  labelText: 'Password',
                  icon: Icons.password_outlined,
                ),
                Button(
                    text: 'Signup',
                    onTap: () async {
                      String response = await authController.createUser(
                          _name.text, _username.text, _password.text);
                      showSnackBar(response, 4);
                    }),
                SizedBox(height: 10),
                Divider(
                  color: Colors.grey[400],
                  thickness: 1,
                  indent: 20,
                  endIndent: 20,
                ),
                SizedBox(height: 20),
                Button(
                  text: 'Already have a account? Login',
                  onTap: () {
                    setState(() {
                      _currentScreen = _OnboardingScreens.login;
                    });
                  },
                  backgroundColor: Colors.green,
                ),
              ],
            ),
          if (_currentScreen == _OnboardingScreens.forgotPassword)
            Column(
              children: [],
            ),
        ],
      ),
    );
  }
}
