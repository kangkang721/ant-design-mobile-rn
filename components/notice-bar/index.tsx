import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import Icon from '../icon';
import variables from '../style/themes/default';
import Marquee, { MarqueeProps } from './Marquee';
import { NoticeBarPropsType } from './PropsType';
import NoticeStyle, { INoticeBarStyle } from './style/index';

export interface NoticeNativeProps extends NoticeBarPropsType {
  styles?: INoticeBarStyle;
  marqueeProps?: MarqueeProps;
  style?: StyleProp<ViewStyle>;
}

const NoticeStyles = StyleSheet.create<any>(NoticeStyle);

export default class NoticeBar extends React.Component<NoticeNativeProps, any> {
  static defaultProps = {
    mode: '',
    onPress() {},
    icon: <Icon name="sound" color={variables.brand_warning}/>,
    styles: NoticeStyles,
  };

  constructor(props: NoticeNativeProps) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onPress = () => {
    const { mode, onPress } = this.props;
    if (onPress) {
      onPress();
    }
    if (mode === 'closable') {
      this.setState({
        show: false,
      });
    }
  };

  render() {
    const { children, mode, icon, style, action, marqueeProps } = this.props;
    const styles = this.props.styles!;

    let operationDom: any = null;
    if (mode === 'closable') {
      operationDom = (
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.actionWrap}>
            {action ? action : <Text style={[styles.close]}>×</Text>}
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (mode === 'link') {
      operationDom = (
        <View style={styles.actionWrap}>
          {action ? action : <Text style={[styles.link]}>∟</Text>}
        </View>
      );
    }

    const main = (
      <View style={[styles.notice, style]}>
        {icon && <View style={styles.left15}>{icon}</View>}
        <View style={[styles.container, icon ? styles.left6 : styles.left15]}>
          <Marquee style={styles.content} text={children} {...marqueeProps} />
        </View>
        {operationDom}
      </View>
    );
    return this.state.show ? (
      mode === 'closable' ? (
        main
      ) : (
        <TouchableWithoutFeedback onPress={this.onPress}>
          {main}
        </TouchableWithoutFeedback>
      )
    ) : null;
  }
}
