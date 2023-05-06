package com.group.chitchat.exception;

import com.group.chitchat.service.internationalization.BundleService;
import java.util.Locale;


public class UserNotFoundException extends RuntimeException {

  /**
   * The exception is when the user tries to enter the site with a username that is not found.
   *
   * @param username The username.
   */
  public UserNotFoundException(String username) {

    super(String.format(
        new BundleService()
            .getMessForLocale("e.userName_not_exist",
                Locale.getDefault()),
        username));
  }

  public UserNotFoundException(Long id) {

    super(String.format(
        new BundleService()
            .getMessForLocale("e.userId_not_exist",
                Locale.getDefault()),
        id));
  }
}
