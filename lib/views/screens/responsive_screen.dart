import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/views/screens/display_size_not_supported_screen.dart';

/*
  Code Review:
  Review #1: 26/01/2025.
*/

class ResponsiveScreen extends StatelessWidget {
  final Widget? tabScreen;
  final Widget? mobileScreen;
  final Widget? desktopScreen;

  const ResponsiveScreen({
    super.key,
    this.tabScreen,
    this.mobileScreen,
    this.desktopScreen,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 940) {
          // Desktops and Large Screen Displays
          currentDisplay = SupportedDisplay.large;
          if (desktopScreen != null) {
            return desktopScreen!;
          }
        } else if (constraints.maxWidth > 520) {
          // Tablets and Medium Screen Displays
          currentDisplay = SupportedDisplay.medium;
          if (tabScreen != null) {
            return tabScreen!;
          }
        } else if (constraints.maxWidth > 250) {
          // Mobiles and Small Screen Displays
          currentDisplay = SupportedDisplay.small;
          if (mobileScreen != null) {
            return mobileScreen!;
          }
        }
        // Screen Not Provided for Particular Display Size
        currentDisplay = null;
        return DisplaySizeNotSupportedScreen();
      },
    );
  }
}
