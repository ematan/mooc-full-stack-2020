import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount,
    id
  }
}
`

export const ALL_BOOKS = gql`
query ALL_BOOKS($genre: String) {
  allBooks(genre: $genre) {
    title,
    published,
    author {
      name
    },
    id,
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
  $title: String!,
  $published: Int!,
  $author: String!,
  $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published,
      genres
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor(
  $name: String!,
  $setBornTo: Int!
) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born,
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`