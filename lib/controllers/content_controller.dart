import 'dart:convert';
import 'dart:html' as html;
import 'package:http/http.dart' as http;

/*
  Code Review:
  Review #1: 26/01/2025.
*/

class ContentController {
  Future<String> uploadVideo(dynamic videoFile, String caption) async {
    try {
      if (videoFile != null && caption.isNotEmpty) {
        final reader = html.FileReader();
        reader.readAsArrayBuffer(videoFile);
        await reader.onLoadEnd.first;
        final request = http.MultipartRequest(
            'POST', Uri.parse('http://localhost:4000/services/content/upload'));
        request.files.add(http.MultipartFile.fromBytes(
            'video', reader.result as List<int>,
            filename: videoFile.name));
        request.fields['caption'] = caption;
        final response = await request.send();
        if (response.statusCode == 200) {
          final responseString = await response.stream.bytesToString();
          switch (responseString) {
            case 'SOMETHING WENT WRONG':
              return 'SOMETHING WENT WRONG AT OUR END';
            case 'CONTENT UPLOADED':
              return 'SUCCESS';
            default:
              return 'SOMETHING WENT WRONG';
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
  }

  Future<String> fetchContent(int contentid) async {
    try {
      if (contentid > 0) {
        final response = await http.post(
          Uri.parse('http://localhost:4000/services/content/fetch'),
          body: jsonEncode({
            'contentid': contentid,
          }),
        );
        if (response.statusCode == 200) {
          switch (response.body) {
            case 'SOMETHING WENT WRONG':
              return 'SOMETHING WENT WRONG AT OUR END';
            case 'USER DOES NOT EXISTS':
              return 'USER DOES NOT EXISTS';
            case 'WRONG PASSWORD':
              return 'WRONG PASSWORD';
            default:
              return 'SUCCESS';
          }
        } else {
          return 'INVALID RESPONSE';
        }
      } else {
        return 'INVALID CONTENT ID';
      }
    } catch (e) {
      return 'SOMETHING WENT WRONG: $e';
    }
  }
}
