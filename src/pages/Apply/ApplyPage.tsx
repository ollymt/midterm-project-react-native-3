import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Haptics from "expo-haptics";

import { useTheme } from "../../contexts/ThemeContext";
import { getStyles } from "../../styles/MainStyles";
import Button from "../../components/Button/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required!")
    .min(2, "Name must be at least 2 characters!"),

  email: Yup.string()
    .required("Email is required!")
    .email("Enter valid email!"),

  number: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]+$/, "Phone number must contain only digits!")
    .min(10, "Phone number must be 10-11 digits!")
    .max(11, "Phone number must be 10-11 digits!"),

  why: Yup.string()
    .required("Tell us why we should hire you!")
    .min(100, "Enter at least 100 characters!")
    .max(1000, "That's enough!"),
});

export default function ApplyPage({ navigation }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const initValues = {
    name: "",
    email: "",
    number: "",
    why: "",
  };

  const onSubmitForm = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form values:", values);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      Alert.alert("Success", "Form submitted successfully!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            navigation.popToTop();
            navigation.navigate("Lawns");
          },
        },
      ]);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[ styles.scrollContainer, { flex: 1 } ]}
        >
          <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            validateOnMount={false}
            validateOnChange={true} // Make sure this is true
            validateOnBlur={true} // Make sure this is true
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched, // Add this
            }) => {
                console.log("Current Formik Errors:", errors);
                console.log("Touched Fields:", touched);
              return (
                <View style={{ gap: 50 }}>
                  {/* Full Name Field */}
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.buttonSecondaryText,
                        { color: theme.text, textAlign: "left" },
                      ]}
                    >
                      Name *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.card,
                          color: theme.text,
                          borderColor: errors.name ? "red" : theme.border, // Show red if any error exists
                        },
                      ]}
                      keyboardAppearance={theme.isDarkMode ? "dark" : "light"}
                      placeholder="Enter your full name"
                      placeholderTextColor={theme.textSecondary}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      returnKeyType="next"
                    />
                    {/* Always show error if it exists, regardless of touched */}
                    {errors.name && (
                      <Text style={{ color: "#FF0000", marginTop: 0 }}>
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  {/* Email Field */}
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.buttonSecondaryText,
                        { color: theme.text, textAlign: "left" },
                      ]}
                    >
                      Email *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.card,
                          color: theme.text,
                          borderColor: errors.email ? "red" : theme.border,
                        },
                      ]}
                      keyboardAppearance={theme.isDarkMode ? "dark" : "light"}
                      placeholder="Enter your email"
                      placeholderTextColor={theme.textSecondary}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                    {errors.email && (
                      <Text style={{ color: "#FF0000", marginTop: 4 }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Phone Field */}
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.buttonSecondaryText,
                        { color: theme.text, textAlign: "left" },
                      ]}
                    >
                      Phone Number *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.card,
                          color: theme.text,
                          borderColor: errors.number ? "red" : theme.border,
                        },
                      ]}
                      keyboardAppearance={theme.isDarkMode ? "dark" : "light"}
                      placeholder="Enter your phone number"
                      placeholderTextColor={theme.textSecondary}
                      onChangeText={(text) => {
                        // Only allow numbers
                        const numericText = text.replace(/[^0-9]/g, "");
                        handleChange("number")(numericText);
                      }}
                      onBlur={handleBlur("number")}
                      value={values.number}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                    />
                    {errors.number && (
                      <Text style={{ color: "#FF0000", marginTop: 4 }}>
                        {errors.number}
                      </Text>
                    )}
                  </View>

                  {/* Why Field */}
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.buttonSecondaryText,
                        { color: theme.text, textAlign: "left" },
                      ]}
                    >
                      Why should we hire you? (100-1000 chars) *
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: theme.card,
                          color: theme.text,
                          borderColor: errors.why ? "red" : theme.border,
                          minHeight: 120,
                          textAlignVertical: "top",
                        },
                      ]}
                      keyboardAppearance={theme.isDarkMode ? "dark" : "light"}
                      placeholder="Why should we hire you?"
                      placeholderTextColor={theme.textSecondary}
                      onChangeText={handleChange("why")}
                      onBlur={handleBlur("why")}
                      value={values.why}
                      multiline={true}
                      numberOfLines={5}
                      returnKeyType="done"
                    />
                    {errors.why && (
                      <Text style={{ color: "#FF0000", marginTop: 4 }}>
                        {errors.why}
                      </Text>
                    )}
                    {/* Character counter */}
                    <Text
                      style={{
                        color: errors.why ? "#FF0000" : theme.textSecondary,
                        fontSize: 12,
                        marginTop: 4,
                        textAlign: "right",
                      }}
                    >
                      {values.why.length}/1000 characters
                      {values.why.length > 0 &&
                        values.why.length < 100 &&
                        ` (${100 - values.why.length} more needed)`}
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingBottom: 20,
                      gap: 5,
                      paddingTop: 120,
                    }}
                  >
                    {/* Submit Button */}
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonPrimary,
                        { width: "100%" },
                      ]}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.buttonPrimaryText]}>Apply</Text>
                    </Pressable>

                    {/* Reset Button */}
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonSecondary,
                        { width: "100%" },
                      ]}
                      onPress={() => {
                        Haptics.notificationAsync(
                          Haptics.NotificationFeedbackType.Warning,
                        );
                        Alert.alert(
                          "Are you sure you want to reset?",
                          "Resetting will clear all the fields. This action cannot be undone.",
                          [
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                            {
                              text: "Reset Form",
                              style: "destructive",
                              onPress: () => {
                                setFieldValue("name", "");
                                setFieldValue("email", "");
                                setFieldValue("number", "");
                                setFieldValue("why", "");
                                // Also reset touched states
                                setFieldTouched("name", false);
                                setFieldTouched("email", false);
                                setFieldTouched("number", false);
                                setFieldTouched("why", false);
                              },
                            },
                          ],
                        );
                      }}
                    >
                      <Text style={[styles.buttonSecondaryText]}>Reset</Text>
                    </Pressable>
                  </View>
                </View>
              );}}
          </Formik>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
