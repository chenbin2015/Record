import React, { Component } from 'react'
import { DatePickerIOS, View, Button, Picker, Text, Switch, TabBarIOS, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { YMMToast } from '../../components'

export default class Alert extends Component {
  state = {
    buttonText: 'Select Date',
    dateVisible: false,
    date: new Date(),
    pickVisible: false,
    pickButtonText: 'Select Picker',
    selectedTab: 'oneTab',
    base64Icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg=='
  }

  handleSelectDate = () => {
    const { dateVisible, date } = this.state
    const text = !dateVisible ? 'Confirm' : 'Select Date'
    this.setState({
      dateVisible: !dateVisible,
      buttonText: text
    })
  }

  handleDateChange = (newDate) => {
    this.setState({
      date: newDate
    })
  }

  handleSelectPicker = () => {
    const { pickVisible, date } = this.state
    const text = !pickVisible ? 'Confirm' : 'Select Picker'
    this.setState({
      pickVisible: !pickVisible,
      pickButtonText: text
    })
  }

  renderDatePickerIOS() {
    const { buttonText, date, dateVisible } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <Button title={buttonText} onPress={this.handleSelectDate}></Button>
        <DatePickerIOS
          style={{display: dateVisible ? 'flex' : 'none'}}
          date={date}
          mode="date"
          onDateChange={ this.handleDateChange }
        ></DatePickerIOS>
      </View>
    )
  }

  renderPicker() {
    const { pickVisible } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <Text>{this.state.language}</Text>
        <Button title='Select Picker' onPress={this.handleSelectPicker}></Button>
        <Picker
          style={{display: pickVisible ? 'flex' : 'none', borderWidth: 1, borderStyle: 'solid', borderColor: 'red'}}
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="Java" value="java2" />
          <Picker.Item label="JavaScript" value="js2" />
          <Picker.Item label="Java" value="java3" />
          <Picker.Item label="JavaScript" value="js3" />
          <Picker.Item label="Java" value="java4" />
          <Picker.Item label="JavaScript" value="js4" />
        </Picker>
      </View>
    )
  }

  renderSwitch() {
    return <Switch />
  }

  renderTabOneContent(color, pageText, num) {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#000'}]}>
        <Text style={styles.tabText}>tab 1</Text>
      </View>
    )
  } 

  renderTabTwoContent(color, pageText, num) {
    return (
      <View style={[styles.tabContent, {backgroundColor: '#000'}]}>
        <Text style={styles.tabText}>tab 2</Text>
      </View>
    )
  } 

  renderTabBar() {
    const { base64Icon } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <TabBarIOS
          unselectedTintColor="#777"
          tintColor="#000"
          barTintColor="#f0f0f0">
          <TabBarIOS.Item
            title="Tab one"
            icon={{uri: base64Icon, scale: 3}}
            selected={this.state.selectedTab === 'oneTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'oneTab'
              })
            }}>
            {this.renderTabOneContent()}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Tab two"
            icon={{uri: base64Icon, scale: 3}}
            selected={this.state.selectedTab === 'twoTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'twoTab'
              })
            }}>
            {this.renderTabTwoContent()}
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    )
  }

  render() {
    const { dateVisible, date } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        { this.renderDatePickerIOS() }
      </View>
    )
  }
}
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'white',
    margin: 50
  }
})