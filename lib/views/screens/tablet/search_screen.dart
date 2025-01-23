import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/models/user.dart';
import 'package:short_video_sharing_app/views/widgets/text_box.dart';
import 'package:short_video_sharing_app/views/screens/tablet/profile_screen.dart';

class TabletSearchScreen extends StatefulWidget {
  const TabletSearchScreen({super.key});

  @override
  State<TabletSearchScreen> createState() => _TabletSearchScreenState();
}

class _TabletSearchScreenState extends State<TabletSearchScreen> {
  List<User> searchedUsers = [];
  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold(
      appBar: AppBar(
        title: TextBox(
            labelText: 'Search',
            controller: controller,
            onSubmitted: (value) async {
              searchedUsers = await searchController.searchUser(value);
              setState(() {});
            }),
      ),
      body: searchedUsers.isEmpty
          ? Center(
              child: Text(
                'Search for users',
                style: TextStyle(
                  fontSize: 25,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            )
          : ListView.builder(
              itemCount: searchedUsers.length,
              itemBuilder: (context, index) {
                User user = searchedUsers[index];
                return InkWell(
                  onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => TabletProfileScreen($user: user),
                    ),
                  ),
                  child: ListTile(
                    title: Text(
                      user.getName(),
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.black54,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                );
              },
            ),
    );
  }
}
