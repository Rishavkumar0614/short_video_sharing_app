import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/models/user.dart';
import 'package:short_video_sharing_app/controllers/auth_controller.dart';
import 'package:short_video_sharing_app/controllers/video_controller.dart';
import 'package:short_video_sharing_app/controllers/search_controller.dart';
import 'package:short_video_sharing_app/controllers/profile_controller.dart';

enum SupportedDisplay {
  large,
  small,
  medium,
}

late SupportedDisplay? currentDisplay;
late BuildContext? currentScreenContext;

// Current User
late User user;

// CONTROLLERS
var authController = AuthController();
var videoController = VideoController();
var searchController = $SearchController();
var profileController = ProfileController();
