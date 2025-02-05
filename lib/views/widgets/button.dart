import 'package:flutter/material.dart';

/*
  Code Review:
  Review #1: 26/01/2025.
*/

class Button extends StatelessWidget {
  final String text;
  final bool disableOnTap;
  final VoidCallback onTap;
  final Color backgroundColor;
  final double maxWidth, maxHeight;

  const Button({
    super.key,
    required this.text,
    required this.onTap,
    this.maxWidth = 350,
    this.maxHeight = 85,
    this.disableOnTap = false,
    this.backgroundColor = Colors.blueAccent,
  });

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth, maxHeight: maxHeight),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: ElevatedButton(
          onPressed: onTap,
          style: ElevatedButton.styleFrom(
            backgroundColor: backgroundColor,
            minimumSize: const Size(double.infinity, 50),
          ),
          child: Text(
            text,
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
        ),
      ),
    );
  }
}
