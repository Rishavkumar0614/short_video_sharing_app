import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/utils/snack_bar.dart';
import 'package:short_video_sharing_app/views/widgets/button.dart';
import 'package:short_video_sharing_app/views/widgets/text_box.dart';
import 'package:short_video_sharing_app/views/screens/tablet/add_video_screen.dart';

/*
  Code Review:
  Review #1: 26/01/2025.
*/

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
            Button(
                text: 'Upload',
                onTap: () async {
                  String response = await contentController.uploadVideo(
                      widget.videoFile, _captionController.text);
                  switch (response) {
                    case 'SOMETHING WENT WRONG AT OUR END':
                      showSnackBar('Something went wrong at our end', 2);
                    case 'SUCCESS':
                      showSnackBar('Video uploaded successfully', 2);
                      Navigator.push(
                        currentScreenContext!,
                        MaterialPageRoute(
                          builder: (context) => TabletAddVideoScreen(),
                        ),
                      );
                    case 'INVALID RESPONSE':
                      showSnackBar('Invalid response', 2);
                    case 'PLEASE FILL THE FIELDS WITH VALID DATA':
                      showSnackBar('Please fill the fields with valid data', 2);
                    default:
                      showSnackBar('Something went wrong', 2);
                  }
                }),
          ],
        ),
      ),
    );
  }
}
