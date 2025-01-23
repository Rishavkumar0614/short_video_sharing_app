import 'dart:convert';
import 'dart:html' as html;
import 'package:http/http.dart' as http;

class VideoController {
  Future<String> uploadVideo(dynamic videoFile, String caption) async {
    try {
      if (videoFile != null && caption.isNotEmpty) {
        print('hi');
        final reader = html.FileReader();
        reader.readAsArrayBuffer(videoFile);
        await reader.onLoadEnd.first;
        final request = http.MultipartRequest(
            'POST', Uri.parse('http://localhost:4000/services/content/upload'));
        request.files.add(http.MultipartFile.fromBytes(
            'video', reader.result as List<int>,
            filename: videoFile.name));
        request.fields['caption'] = caption;
        print('hi hello');
        final response = await request.send();
        if (response.statusCode == 200) {
          final responseString = await response.stream.bytesToString();
          switch (responseString) {
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
        return 'PLEASE FILL ALL THE FIELDS';
      }
    } catch (e) {
      print(e);
      return 'SOMETHING WENT WRONG: $e';
    }
  }
}
