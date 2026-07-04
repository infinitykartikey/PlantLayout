// This is an example of how your data.js file might be structured

export const testImages = [
  {
    id: 'img1',
    // For local images, use require syntax
    image: require('../../assets/images/coin4.png'),
    correctAnswer: '4',
    options: ['2', '3', '4', 'None of the above']
  },
  {
    id: 'img2',
    image: require('../../assets/images/coin8.png'),
    correctAnswer: '8',
    options: ['8', '5', '6', 'None of the above']
  },
  {
    id: 'img3',
    image: require('../../assets/images/coin17.png'),
    correctAnswer: '17',
    options: ['0', '1', '17', 'None of the above']
  },
  {
    id: 'img4',
    image: require('../../assets/images/coin5.png'),
    correctAnswer: 'None of the above',
    options: ['3', '4', '2', 'None of the above']
  },
  {
    id: 'img5',
    image: require('../../assets/images/coin7.png'),
    correctAnswer: '7',
    options: ['7', '1', '2', 'None of the above']
  },
  {
    id: 'img6',
    image: require('../../assets/images/coin9.png'),
    correctAnswer: '9',
    options: ['0', '1', '9', 'None of the above']
  },
  {
    id: 'img7',
    image: require('../../assets/images/coin6.png'),
    correctAnswer: '6',
    options: ['6', '1', '2', 'None of the above']
  },
  {
    id: 'img8',
    image: require('../../assets/images/coin11.png'),
    correctAnswer: '11',
    options: ['0', '11', '2', 'None of the above']
  },
  {
    id: 'img9',
    image: require('../../assets/images/coin12.png'),
    correctAnswer: '12',
    options: ['12', '1', '2', 'None of the above']
  },
  {
    id: 'img10',
    image: require('../../assets/images/coin10.png'),
    correctAnswer: 'None of the above',
    options: ['9', '1', '2', 'None of the above']
  },
];