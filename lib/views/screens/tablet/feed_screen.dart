import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class TabletFeedScreen extends StatefulWidget {
  const TabletFeedScreen({super.key});

  @override
  State<TabletFeedScreen> createState() => _TabletFeedScreenState();
}

class _TabletFeedScreenState extends State<TabletFeedScreen> {
  late VideoPlayerController _controller;
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Tablet Feed Screen'),
      ),
    );
  }
}
