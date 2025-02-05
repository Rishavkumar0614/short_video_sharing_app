import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:short_video_sharing_app/utils/session_manager.dart';
import 'package:short_video_sharing_app/views/screens/responsive_screen.dart';
import 'package:short_video_sharing_app/views/screens/mobile/onboarding_screen.dart';
import 'package:short_video_sharing_app/views/screens/tablet/onboarding_screen.dart';
import 'package:short_video_sharing_app/views/screens/desktop/onboarding_screen.dart';

SessionManager sessionManager = SessionManager();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await sessionManager.initPref();
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Short Video Sharing App',
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: Colors.white,
        fontFamily: GoogleFonts.notoSans().fontFamily,
      ),
      home: ResponsiveScreen(
        tabScreen: TabletOnBoardingScreen(),
        mobileScreen: MobileOnBoardingScreen(),
        desktopScreen: DesktopOnBoardingScreen(),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
