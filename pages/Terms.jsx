/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';

const UserAgreement = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>User Agreement for Quick Aid by Innovate X Teams</Text>
      <Text style={styles.paragraph}>
        Welcome to Quick Aid! Quick Aid is an emergency service platform operated by Innovate X Teams.
        This User Agreement outlines the terms and conditions governing your use of the Quick Aid app.
        By using the Quick Aid platform, you agree to comply with and be bound by the following terms.
      </Text>

      <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By downloading, accessing, or using the Quick Aid app, you accept and agree to the terms of this User Agreement.
        If you do not agree to these terms, please do not use the app.
      </Text>

      <Text style={styles.subHeading}>2. Service Description</Text>
      <Text style={styles.paragraph}>
        Quick Aid provides users with access to emergency services such as police assistance, ambulance services, and
        other support mechanisms during emergencies. The app allows you to request help, receive real-time support,
        and connect to essential services.
      </Text>

      <Text style={styles.subHeading}>3. Eligibility</Text>
      <Text style={styles.paragraph}>
        You must be at least 18 years old to use Quick Aid. By using this app, you represent and warrant that you
        have the legal capacity to enter into this agreement.
      </Text>

      <Text style={styles.subHeading}>4. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>Accurate Information: </Text>
        You agree to provide accurate, current, and complete information as prompted by the registration and account
        creation process.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>Security: </Text>
        You are responsible for maintaining the confidentiality of your login credentials and for all activities
        conducted under your account.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>Use of Services: </Text>
        You agree to use the services only for lawful and emergency purposes. Misuse of the app, such as false or prank
        requests, is strictly prohibited.
      </Text>

      <Text style={styles.subHeading}>5. Service Limitations</Text>
      <Text style={styles.paragraph}>
        Quick Aid services are designed to facilitate emergency responses. However, Innovate X Teams does not guarantee
        the immediate availability or response of any third-party emergency service providers (police, ambulance, etc.).
        The user understands that the app is a tool and does not replace direct communication with authorities.
      </Text>

      <Text style={styles.subHeading}>6. Privacy</Text>
      <Text style={styles.paragraph}>
        Quick Aid collects and processes personal data in accordance with our Privacy Policy, which is incorporated into
        this agreement by reference. By using the app, you consent to the collection, use, and sharing of your personal
        information as described in the Privacy Policy.
      </Text>

      <Text style={styles.subHeading}>7. Disclaimer of Warranties</Text>
      <Text style={styles.paragraph}>
        The Quick Aid app and services are provided "as is" and "as available" without any warranties of any kind, either
        express or implied. Innovate X Teams disclaims all warranties, including but not limited to the availability,
        accuracy, or reliability of the app, its content, or any services accessed through it.
      </Text>

      <Text style={styles.subHeading}>8. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        In no event shall Innovate X Teams or its affiliates be liable for any indirect, incidental, special, consequential,
        or punitive damages arising out of or relating to your use of the Quick Aid app.
      </Text>

      <Text style={styles.subHeading}>9. Third-Party Services</Text>
      <Text style={styles.paragraph}>
        Quick Aid may include links or access to third-party services such as emergency responders or medical services.
        Innovate X Teams is not responsible for the availability or performance of these third-party services and does
        not endorse them.
      </Text>

      <Text style={styles.subHeading}>10. Modifications to Agreement</Text>
      <Text style={styles.paragraph}>
        Innovate X Teams reserves the right to modify this User Agreement at any time. If we make changes, we will notify
        you by updating the date at the top of this agreement or by providing a prominent notice within the app. Your
        continued use of Quick Aid after the changes become effective constitutes your acceptance of the new terms.
      </Text>

      <Text style={styles.subHeading}>11. Termination</Text>
      <Text style={styles.paragraph}>
        Innovate X Teams may suspend or terminate your access to the app at any time without notice for conduct that
        violates this agreement or is otherwise harmful to other users or the app.
      </Text>

      <Text style={styles.subHeading}>12. Governing Law</Text>
      <Text style={styles.paragraph}>
        This User Agreement shall be governed by and construed in accordance with the laws of India without regard to its
        conflict of law principles.
      </Text>

      <Text style={styles.subHeading}>13. Contact Information</Text>
      <Text style={styles.paragraph}>
        If you have any questions or concerns regarding this User Agreement, please contact us at:
        {'\n'}Email: <Text style={{color: 'blue'}} onPress={()=> Linking.openURL('mailto:innovatexservices@gmail.com')}>innovatexservices@gmail.com</Text>
        {'\n'}Address: Naihati, Kolkata
      </Text>

      <Text style={styles.subHeading}>14. Entire Agreement</Text>
      <Text style={styles.paragraph}>
        This User Agreement constitutes the entire agreement between you and Innovate X Teams concerning the use of Quick Aid and supersedes any prior agreements.{'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default UserAgreement;
