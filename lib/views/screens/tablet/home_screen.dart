import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/views/screens/tablet/search_screen.dart';
import 'package:short_video_sharing_app/views/screens/tablet/profile_screen.dart';
import 'package:short_video_sharing_app/views/screens/tablet/add_video_screen.dart';

class TabletHomeScreen extends StatefulWidget {
  const TabletHomeScreen({super.key});

  @override
  State<TabletHomeScreen> createState() => _TabletHomeScreenState();
}

class _TabletHomeScreenState extends State<TabletHomeScreen> {
  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        onTap: (idx) {},
        selectedItemColor: Colors.blueAccent,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(top: 5.0),
              child: Icon(
                size: 30,
                Icons.home,
              ),
            ),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(top: 5.0),
              child: Icon(
                size: 30,
                Icons.search,
              ),
            ),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(top: 5.0),
              child: Icon(
                size: 30,
                Icons.add,
              ),
            ),
            label: 'Add Video',
          ),
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(top: 5.0),
              child: Icon(
                size: 30,
                Icons.message,
              ),
            ),
            label: 'Messages',
          ),
          BottomNavigationBarItem(
            icon: Padding(
              padding: EdgeInsets.only(top: 5.0),
              child: Icon(
                size: 30,
                Icons.person,
              ),
            ),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
