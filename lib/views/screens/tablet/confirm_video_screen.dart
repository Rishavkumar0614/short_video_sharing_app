import 'dart:io';
import 'dart:html' as html;
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/views/widgets/button.dart';
import 'package:short_video_sharing_app/views/widgets/text_box.dart';
import 'package:short_video_sharing_app/controllers/video_controller.dart';

class TabletConfirmVideoScreen extends StatefulWidget {
  final dynamic videoFile;

  const TabletConfirmVideoScreen({super.key, required this.videoFile});

  @override
  State<TabletConfirmVideoScreen> createState() =>
      _TabletConfirmVideoScreenState();
}

class _TabletConfirmVideoScreenState extends State<TabletConfirmVideoScreen> {
  final TextEditingController _captionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            const SizedBox(height: 30),
            const Text('COMPLETE UPLOAD', style: TextStyle(fontSize: 25)),
            const SizedBox(height: 30),
            TextBox(labelText: 'Captions', controller: _captionController),
            Button(text: 'Upload', onTap: () async {
              print('hi');
              await videoController.uploadVideo(widget.videoFile, _captionController.text);
            }),
          ],
        ),
      ),
    );
  }
}
