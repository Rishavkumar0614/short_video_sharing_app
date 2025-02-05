import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';

/*
  This function is used to show a snackbar on the screen.
  It takes two parameters:
  1. message: The message to be displayed in the snackbar.
  If the time is 0, the snackbar will be not be displayed.
  2. time: The time for which the snackbar should be displayed.

  Code Review:
  Review #1: 26/01/2025.
*/

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
