class User {
  final int _userid;
  final String _name;
  final String _username;
  final List<int> _followers;
  final List<int> _following;

  User({required String name, required String username, required int userid})
      : _name = name,
        _following = [],
        _followers = [],
        _userid = userid,
        _username = username;

  Map<String, dynamic> toJson() => {
        "name": _name,
        "userid": _userid,
        "username": _username,
        "followers": _followers,
        "following": _following,
      };

  getName() {
    return _name;
  }

  getUserId() {
    return _userid;
  }

  getUsername() {
    return _username;
  }

  getFollowers() {
    return _followers;
  }

  getFollowing() {
    return _following;
  }
}
