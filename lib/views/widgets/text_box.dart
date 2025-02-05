import 'package:flutter/material.dart';

/*
  Code Review:
  Review #1: 26/01/2025.
*/

class TextBox extends StatelessWidget {
  final IconData? icon;
  final bool isObscure;
  final String labelText;
  final double maxWidth, maxHeight;
  final Function(String)? onSubmitted;
  final TextEditingController controller;

  const TextBox({
    super.key,
    this.icon,
    this.onSubmitted,
    this.maxWidth = 350,
    this.maxHeight = 85,
    this.isObscure = false,
    required this.labelText,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth, maxHeight: maxHeight),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: TextFormField(
          controller: controller,
          obscureText: isObscure,
          decoration: InputDecoration(
            labelText: labelText,
            suffixIcon: icon != null ? Icon(icon) : null,
            contentPadding: const EdgeInsets.fromLTRB(10, 5, 5, 5),
            labelStyle: TextStyle(fontSize: 18, color: Colors.black45),
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(
                width: 1.5,
                color: Color.fromARGB(255, 220, 220, 220),
              ),
              borderRadius: BorderRadius.circular(5),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(
                width: 1.5,
                color: Color.fromARGB(255, 15, 147, 255),
              ),
              borderRadius: BorderRadius.circular(5),
            ),
          ),
          onFieldSubmitted: (value) {
            if (onSubmitted != null) {
              onSubmitted!(value);
            }
          },
        ),
      ),
    );
  }
}
