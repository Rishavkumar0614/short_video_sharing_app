import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:short_video_sharing_app/models/user.dart';

class $SearchController {
  Future<List<User>> searchUser(String name) async {
    try {
      if (name.isNotEmpty) {
        final response = await http.post(
          Uri.parse('http://localhost:4000/services/user/search'),
          body: jsonEncode({'name': name}),
        );
        if (response.statusCode == 200) {
          switch (response.body) {
            case 'SOMETHING WENT WRONG':
              return [];
            default:
              List<dynamic> $response = jsonDecode(response.body);
              List<User> searchedUsers = [];
              for (int i = 0; i < $response.length; i++) {
                searchedUsers.add(User(
                    name: $response[i]["name"]!,
                    username: $response[i]["username"]!,
                    userid: $response[i]["userid"]!));
              }
              return searchedUsers;
          }
        }
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
    return [];
  }
}
