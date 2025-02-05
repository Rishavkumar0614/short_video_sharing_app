import 'dart:convert';
import 'package:http/http.dart' as http;

/*
  Code Review:
  Review #1: 26/01/2025.
*/

class ProfileController {
  Future<String> followUser(int userid, int followerid) async {
    try {
      if (userid >= 0 && followerid >= 0 && userid != followerid) {
        final response = await http.post(
          Uri.parse('http://localhost:4000/services/user/follow'),
          body: jsonEncode({
            'userid': userid,
            'followerid': followerid,
          }),
        );
        if (response.statusCode == 200) {
          switch (response.body) {
            case 'SOMETHING WENT WRONG':
              return 'SOMETHING WENT WRONG AT OUR END';
            case 'USER DOES NOT EXISTS':
              return 'USER DOES NOT EXISTS';
            case 'FOLLOWER DOES NOT EXISTS':
              return 'FOLLOWER DOES NOT EXISTS';
            case 'SUCCESS':
              return 'SUCCESS';
          }
        } else {
          return 'INVALID RESPONSE';
        }
      } else {
        return 'PLEASE FILL THE FIELDS WITH VALID DATA';
      }
    } catch (e) {
      return 'SOMETHING WENT WRONG: $e';
    }
    return '';
  }
}
