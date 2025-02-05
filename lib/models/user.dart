/*
  Code Review:
  Review #1: 26/01/2025.
*/

class User {
  late String _name;
  late final int _userid;
  late List<int> _contents;
  late List<int> _followers;
  late List<int> _following;
  late final String _username;

  User({required String name, required String username, required int userid}) {
    if (name.isEmpty || username.isEmpty || userid <= 0) {
      throw ArgumentError(
          'Name, Username, and Userid must not be empty or invalid');
    }
    _name = name;
    _contents = [];
    _followers = [];
    _following = [];
    _userid = userid;
    _username = username;
  }

  Map<String, dynamic> toJson() => {
        "name": _name,
        "userid": _userid,
        "contents": _contents,
        "username": _username,
        "followers": _followers,
        "following": _following,
      };

  getName() {
    return _name;
  }

  changeName(String name) {
    if (name.isNotEmpty) {
      _name = name;
    }
  }

  getUserId() {
    return _userid;
  }

  getUsername() {
    return _username;
  }

  getContents() {
    return _contents;
  }

  nContents() {
    return _contents.length;
  }

  getFollowers() {
    return _followers;
  }

  nFollowers() {
    return _followers.length;
  }

  getFollowing() {
    return _following;
  }

  nFollowing() {
    return _following.length;
  }

  addContent(int contentid) {
    if (contentid > 0) {
      _contents.add(contentid);
    }
  }

  addFollower(int followerid) {
    if (followerid > 0) {
      _followers.add(followerid);
    }
  }

  addFollowing(int followingid) {
    if (followingid > 0) {
      _following.add(followingid);
    }
  }

  removeContent(int contentid) {
    _contents.remove(contentid);
  }

  removeFollower(int followerid) {
    _followers.remove(followerid);
  }

  removeFollowing(int followingid) {
    _following.remove(followingid);
  }

  validateContent(int contentid) {
    return _contents.contains(contentid);
  }

  validateFollower(int followerid) {
    return _followers.contains(followerid);
  }

  validateFollowing(int followingid) {
    return _following.contains(followingid);
  }
}
