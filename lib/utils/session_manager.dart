import 'package:shared_preferences/shared_preferences.dart';

class SessionManager {
  SharedPreferences? sharedPreferences;
  final Future<SharedPreferences> _pref = SharedPreferences.getInstance();

  Future initPref() async {
    sharedPreferences = await _pref;
  }

  void save(String key, dynamic value) async {
    if (sharedPreferences != null) {
      if (value.runtimeType == int) {
        await sharedPreferences!.setInt(key, value);
      } else if (value.runtimeType == bool) {
        await sharedPreferences!.setBool(key, value);
      } else if (value.runtimeType == String) {
        await sharedPreferences!.setString(key, value);
      } else if (value.runtimeType == double) {
        await sharedPreferences!.setDouble(key, value);
      } else if (value is List<String>) {
        await sharedPreferences!.setStringList(key, value);
      } else {
        throw "Unsupported type for SharedPreferences: ${value.runtimeType}";
      }
    } else {
      throw "SharedPreferences not initialized";
    }
  }

  dynamic fetch(String key) {
    if (sharedPreferences != null) {
      return sharedPreferences!.get(key);
    } else {
      return null;
    }
  }

  void clean() {
    sharedPreferences!.clear();
  }
}
