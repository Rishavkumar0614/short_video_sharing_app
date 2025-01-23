import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';

class MobileHomeScreen extends StatefulWidget {
  const MobileHomeScreen({super.key});

  @override
  State<MobileHomeScreen> createState() => _MobileHomeScreenState();
}

class _MobileHomeScreenState extends State<MobileHomeScreen> {
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
