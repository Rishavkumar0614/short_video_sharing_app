import 'dart:html' as html;
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image_picker_web/image_picker_web.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/views/screens/tablet/confirm_video_screen.dart';

class TabletAddVideoScreen extends StatelessWidget {
  const TabletAddVideoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold(
      body: Center(
        child: LayoutBuilder(
          builder: (context, constraints) {
            double buttonWidth = (constraints.maxWidth * 0.4);
            double buttonHeight = (buttonWidth / 4);
            return InkWell(
              onTap: () async {
                if (kIsWeb) {
                  html.File? videoFile = await ImagePickerWeb.getVideoAsFile();
                  if (videoFile != null) {
                    print('hi');
                    Navigator.push(
                      // Use Navigator.push
                      currentScreenContext!,
                      MaterialPageRoute(
                        builder: (context) =>
                            TabletConfirmVideoScreen(videoFile: videoFile),
                      ),
                    );
                  }
                } else if (defaultTargetPlatform == TargetPlatform.iOS ||
                    defaultTargetPlatform == TargetPlatform.android) {
                  showDialog(
                    context: context,
                    builder: (context) => SimpleDialog(
                      children: [
                        SimpleDialogOption(
                          onPressed: () async {
                            final video = await ImagePicker()
                                .pickVideo(source: ImageSource.gallery);
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
                            final video = await ImagePicker()
                                .pickVideo(source: ImageSource.camera);
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
                } else if (defaultTargetPlatform == TargetPlatform.linux ||
                    defaultTargetPlatform == TargetPlatform.macOS ||
                    defaultTargetPlatform == TargetPlatform.windows ||
                    defaultTargetPlatform == TargetPlatform.fuchsia) {}
              },
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
