import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class BookingCancelation extends Component {
  render() {
    return (
      <View style={{width: '100%'}}>
        <View style={{width: '100%', justifyContent: 'center'}}>
          <Text style={{...styles.header, textAlign: 'center'}}>
            GENIUS FOOTBALL LIMITED
          </Text>
        </View>
        <Text style={styles.header}>
          BOOKING CONDITIONS
        </Text>
        <Text style={styles.text}>
          Our Site and Application helps you to find sports activities and locations and to make reservations
          for these either through links to third parties or through this Site and Application for services
          and products delivered by suppliers for whom We act as agents. When you make a booking, you are
          entering into a contract with suppliers via Genius Football Ltd. t/a findafive.ie, not with Genius
          Football Ltd. t/a findafive.ie
        </Text>
        <Text style={styles.text}>
          As such when making a booking for a sports Facility it is your responsibility to seek out and
          familiarise out the terms for that sports Facility in the instance that they are not otherwise
          provided to you.
        </Text>
        <Text style={styles.text}>
          As the Site and Application acts as an interface in your transactions with suppliers in the sport
          industry, you must be legally authorised to enter into contractual obligations and have the
          requisite consent or authority to act for or on behalf of any persons included in such transactions.
          If you are under the age of 18, you must not Use this Site or Application or submit personal
          information unless you have the consent of, and are supervised by, a parent or guardian. You warrant
          that all data provided by you is accurate and you guarantee the accuracyof any information entered
          on this Site or Application by youin relation to a transaction, booking or person whom you
          represent.
        </Text>
        <Text style={styles.text}>
          Any Use of this Site or Application by you which is fraudulent or in conflict with these Site Terms
          shall give Us the right to refuse you accessto the products and services offered by Us and sport
          industry suppliers or to the Site or Application.
        </Text>
        <Text style={styles.text}>
          AAny bookings made by you with third party suppliers (who are not Affiliates) will be governed by
          the terms and conditions of such third-party suppliers. Any bookings made by you through this Site
          or Application with Affiliates will be governed by these Site Terms and any other legal notices
          contained on this Site or Application or any other specific sales terms and conditions which are on
          this Site or Application and which We draw your attention to during the booking process.

        </Text>

        <Text style={styles.header}>
          LIABILITY FOR BOOKINGS
        </Text>
        <Text style={styles.text}>
          Genius Football Ltd. t/a findafive.ie is not responsible for and disclaims any and all liability
          related to any and all bookings for our suppliers’ Facilities. Accordingly, any bookings that are
          made by you as a result of using the Site or Application are done so at your own risk and when
          making a booking you accept all liability for any losses or damages that occur at a Facility as a
          direct or indirect result of a booking you make for the Facility.
        </Text>
        <Text style={styles.text}>
          Genius Football Ltd. t/a findafive.ie shall not in any circumstances haveany liability for any
          losses or damages which may be suffered by the supplier (or any person claiming under or through the
          supplier), whether the same are suffered directly or indirectly or are immediate or consequential,
          and whether the same arise in contract, tort (including negligence) or otherwise howsoever, which
          fall within any of the following categories:
          • damage, even though Genius Football Ltd. t/a
          findafive.ie was aware ofthe circumstances in which such special damages could arise;
          • loss of profits;
          • loss of anticipated savings;
          • loss of business opportunity;
          • loss of goodwill;
          • any injury or death resulting from a booking that Genius Football Limited t/a findafive.ie
          facilitated.
        </Text>

        <Text style={styles.header}>
          PRICING, CHANGES TO BOOKINGS AND CANCELLATIONS
        </Text>
        <Text style={styles.text}>
          All refunds and cancellations are subject to the Facility’s terms. In general, there are no refunds
          granted for the cancellation of bookings. A change in time, partial refund or refund is subject to
          the venue policy andmay be granted at the absolute discretion of the Facility.
        </Text>
        <Text style={styles.text}>
          There may be unforeseen changes to the availability of a slot after a booking has been paid for via
          the site. In these cases We will do all that is reasonably possible to find an alternative slot, and
          if none can be found that you would like to accept, a full refund will be processed with 2 business
          days.
        </Text>
        <Text style={styles.text}>
          The Facility may cancel or move a booking at any time for reasons beyond Our control. In these
          instances we will make every effort to gain a refund on behalf of the booker or move the booking to
          a suitable time.
        </Text>
        <Text style={styles.text}>
          The price for bookings may change at any time and the information provided on our site may not be
          correct. We will make every effort to ensure that the correct pricing is provided at the time of
          booking but cases may occur when the Facility amends their pricing before a bookinghas started. As
          such it is our responsibility to pass on the pricedifference but we accept no liability for any
          change in price.
        </Text>
        <Text style={styles.text}>
          As an Agent We reserve the right to charge a non-refundable booking fee to cover our expenses,
          including (but not limited to) card handling fees.
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 20,
    color: 'white',
    paddingBottom: 15
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    color: 'white',
    paddingBottom: 10
  },
});
export default BookingCancelation;
