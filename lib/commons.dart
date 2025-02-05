import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/models/user.dart';
import 'package:short_video_sharing_app/controllers/auth_controller.dart';
import 'package:short_video_sharing_app/controllers/search_controller.dart';
import 'package:short_video_sharing_app/controllers/content_controller.dart';
import 'package:short_video_sharing_app/controllers/profile_controller.dart';

/*
  Code Review:
  Review #1: 26/01/2025.
*/

enum SupportedDisplay {
  large,
  small,
  medium,
}

class SessionKeys {
  static const auth = 'AUTH';
  static const isLogin = 'ISLOGIN';
}

late SupportedDisplay? currentDisplay;
late BuildContext? currentScreenContext;

// Current User
late User currentUser;

// CONTROLLERS
var authController = AuthController();
var searchController = $SearchController();
var profileController = ProfileController();
var contentController = ContentController();
