import 'package:flutter/material.dart';
import 'package:short_video_sharing_app/commons.dart';
import 'package:short_video_sharing_app/models/user.dart';
import 'package:short_video_sharing_app/utils/snack_bar.dart';
import 'package:short_video_sharing_app/views/widgets/button.dart';

User $user = user;

class TabletProfileScreen extends StatefulWidget {
  const TabletProfileScreen({super.key, $user});

  @override
  State<TabletProfileScreen> createState() => _TabletProfileScreenState();
}

class _TabletProfileScreenState extends State<TabletProfileScreen> {
  @override
  Widget build(BuildContext context) {
    currentScreenContext = context;
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Padding(
          padding: const EdgeInsets.only(left: 5.0),
          child: Text(
            $user.getName(),
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                child: Column(
                  children: [
                    SizedBox(
                      height: 20,
                    ),
                    Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 20.0),
                            child: Column(
                              children: [
                                Text(
                                  '0',
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 5),
                                const Text(
                                  'Posts',
                                  style: TextStyle(
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(right: 20.0),
                            child: Column(
                              children: [
                                Text(
                                  '${$user.getFollowers().length}',
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 5),
                                const Text(
                                  'Followers',
                                  style: TextStyle(
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(right: 20.0),
                            child: Column(
                              children: [
                                Text(
                                  '${user.getFollowing().length}',
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 5),
                                const Text(
                                  'Following',
                                  style: TextStyle(
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    if ($user.getUserId() != user.getUserId())
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Button(
                              text: 'Follow',
                              onTap: () async {
                                String $response =
                                    await profileController.followUser(
                                        $user.getUserId(), user.getUserId());
                                showSnackBar($response, 4);
                              }),
                          SizedBox(width: 10),
                          Button(text: 'Message', onTap: () async {}),
                        ],
                      ),
                    if ($user.getUserId() == user.getUserId())
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Button(text: 'Message', onTap: () async {}),
                        ],
                      ),
                    const SizedBox(
                      height: 25,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
