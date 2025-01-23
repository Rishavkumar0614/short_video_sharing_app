import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';

void showSnackBar(String message, int time) {
  if (time > 0 && message != '' && currentScreenContext != null) {
    if (currentDisplay == SupportedDisplay.large) {
      ScaffoldMessenger.of(currentScreenContext!).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: Duration(seconds: time),
          backgroundColor: Colors.grey[900],
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
          ),
        ),
      );
    } else if (currentDisplay == SupportedDisplay.medium) {
      ScaffoldMessenger.of(currentScreenContext!).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: Duration(seconds: time),
          backgroundColor: Colors.grey[900],
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
          ),
        ),
      );
    } else if (currentDisplay == SupportedDisplay.small) {
      ScaffoldMessenger.of(currentScreenContext!).showSnackBar(
        SnackBar(
          content: Text(message),
          duration: Duration(seconds: time),
          backgroundColor: Colors.grey[900],
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
          ),
        ),
      );
    }
  }
}
