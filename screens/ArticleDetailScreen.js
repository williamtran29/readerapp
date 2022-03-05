import * as React from 'react';
import { Linking, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Text, Headline, Paragraph } from 'react-native-paper';
import striptags from "striptags";

export function ArticleDetailScreen({ route }) {
  const { 
          title, 
          author,
          description, 
          source, 
          content, 
          url,
          urlToImage
  } = route.params.article;
  
  const handleOpenURl = () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.titleRow}>
          <Headline onPress={handleOpenURl}>
            {title}
          </Headline>
        </View>
        {!!author && (
          <View style={styles.authorRow}>
              <Text>Author: {striptags(author)}</Text>
          </View>
        )}
        <View style={styles.sourceRow}>
            <Paragraph style={styles.sourceText}>
              Source: {source.name}
            </Paragraph>
        </View>
        <Card.Cover source={{ uri:  urlToImage }} />
        <View style={styles.infoRow}>
            <Text style={styles.description}>
              {description}
            </Text>
        </View>
        <View style={styles.infoRow}>
          <Paragraph>{content}</Paragraph>
        </View>
        <View style={styles.buttonWrapper}>
          <Button icon="web" mode="contained" onPress={handleOpenURl}>
            Read More
          </Button>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60 
  },
  titleRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20
  },
  description: {
    fontWeight: '500'
  },
  buttonWrapper: {
    marginHorizontal: 20,
  },
  sourceRow: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  authorRow: {
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    margin: 20,
  },
  sourceText: {
      textAlign: 'right', 
      fontStyle: 'italic'
  }
});
