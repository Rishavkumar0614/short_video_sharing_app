import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/models/user.dart';

class AuthController {
  Future<String> loginUser(String username, String password) async {
    try {
      if (username.isNotEmpty && password.isNotEmpty) {
        final response = await http.post(
          Uri.parse('http://localhost:4000/services/user/login'),
          body: jsonEncode({
            'username': username,
            'password': password,
          }),
        );
        if (response.statusCode == 200) {
          switch (response.body) {
            case 'SUCCESS':

            case 'SOMETHING WENT WRONG':
              return 'SOMETHING WENT WRONG AT OUR END';
            case 'USER DOES NOT EXISTS':
              return 'USER DOES NOT EXISTS';
            case 'WRONG PASSWORD':
              return 'WRONG PASSWORD';
            default:
              Map<String, dynamic> $response = jsonDecode(response.body);
              currentUser = User(
                  name: $response["name"]!,
                  username: $response["username"]!,
                  userid: $response["userid"]!);
              return 'SUCCESS';
          }
        } else {
          return 'INVALID RESPONSE';
        }
      } else {
        return 'PLEASE FILL ALL THE FIELDS';
      }
    } catch (e) {
      return 'SOMETHING WENT WRONG: $e';
    }
  }

  Future<String> createUser(
      String name, String username, String password) async {
    try {
      if (name.isNotEmpty && username.isNotEmpty && password.isNotEmpty) {
        final response = await http.post(
          Uri.parse('http://localhost:4000/services/user/signup'),
          body: jsonEncode({
            'name': name,
            'username': username,
            'password': password,
          }),
        );
        if (response.statusCode == 200) {
          switch (response.body) {
            case 'SOMETHING WENT WRONG':
              return 'SOMETHING WENT WRONG AT OUR END';
            case 'USER ALREADY EXISTS':
              return 'USER ALREADY EXISTS';
            default:
              Map<String, dynamic> $response = jsonDecode(response.body);
              currentUser = User(
                  name: $response["name"]!,
                  username: $response["username"]!,
                  userid: $response["userid"]!);
              return 'SUCCESS';
          }
        } else {
          return 'INVALID RESPONSE';
        }
      } else {
        return 'PLEASE FILL ALL THE FIELDS';
      }
    } catch (e) {
      return 'SOMETHING WENT WRONG: $e';
    }
  }
}
