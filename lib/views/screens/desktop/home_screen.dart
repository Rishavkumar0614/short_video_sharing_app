import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';

class DesktopHomeScreen extends StatefulWidget {
  const DesktopHomeScreen({super.key});

  @override
  State<DesktopHomeScreen> createState() => _DesktopHomeScreenState();
}

class _DesktopHomeScreenState extends State<DesktopHomeScreen> {
  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold();
  }
}
