// import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
// import 'package:short_video_sharing_app/commons.dart';
// import 'package:tiktok/views/screens/mobile/confirm_video_screen.dart';

class MobileAddVideoScreen extends StatelessWidget {
  const MobileAddVideoScreen({super.key});

  Future<XFile?> pickVideo(ImageSource? src) async {
    return (await ImagePicker()
        .pickVideo(source: (src != null) ? src : ImageSource.gallery));
  }

  showOptionsDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) => SimpleDialog(
        children: [
          SimpleDialogOption(
            onPressed: () async {
              final video = await pickVideo(null);
              if (video != null) {}
            },
            child: Row(
              children: [
                const Icon(Icons.image),
                Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: Text('Gallery'),
                )
              ],
            ),
          ),
          SimpleDialogOption(
            onPressed: () async {
              final video = await pickVideo(ImageSource.camera);
              if (video != null) {}
            },
            child: Row(
              children: [
                const Icon(Icons.camera_alt),
                Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: Text('Camera'),
                ),
              ],
            ),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.of(context).pop(),
            child: Row(
              children: [
                const Icon(Icons.cancel),
                Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: Text('Cancel'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: LayoutBuilder(
          builder: (context, constraints) {
            double buttonWidth = (constraints.maxWidth * 0.4);
            double buttonHeight = (buttonWidth / 4);

            return InkWell(
              onTap: () => showOptionsDialog(context),
              child: Container(
                width: buttonWidth,
                height: buttonHeight,
                decoration: BoxDecoration(
                  color: Colors.blueAccent,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(
                  child: Text(
                    'ADD VIDEO',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
