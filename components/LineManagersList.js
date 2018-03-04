import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator
} from 'react-native'
import config from '../config.json';

export default class LineManagersList extends React.Component {
    static navigationOptions = {
        title: 'Line Managers',
        headerTitleStyle: {
            color: '#FFF',
        },
    };
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            lineManagers: [],
            dataSource: ds,
            loaded:false,
        };
    }
    componentDidMount() {
        var url = 'http://' + config.ip + ':' + config.port + '/mobileAPI/retrieveList?type=lineManagers';
        return fetch(url).then((response) => response.json())
            .then((responseJson) => {
                debugger;
                this.setState({
                    loaded:true,
                    dataSource: this.state.dataSource.cloneWithRows(responseJson)
                })

            })
            .catch((error) => {
                this.setState({ errorMessage: error })
            });
    }
    renderRow(lineManager) {
        return (
            <View style={Styles.lineManagerContainer}>
                <Text style={Styles.lineManagerContainerText}>First Name: {lineManager.firstName}</Text>
                <Text style={Styles.lineManagerContainerText}>Last Name: {lineManager.lastName}</Text>
                <Text style={Styles.lineManagerContainerText}>Date Created: {lineManager.dateCreated}</Text>
            </View>
        )
    }
    render() {
        if(this.state.loaded){
            return (
                <ListView
                    style={Styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this.renderRow(data)} />
            )
        }else{
            return (
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    lineManagerContainer: {
        padding: 30,
        backgroundColor: '#FFF',
        borderColor: '#000',
        marginBottom: 10,
        margin: 10,
        borderRadius: 3,
        elevation: 3
    },
    lineManagerContainerText: {
        fontSize: 18
    }
})