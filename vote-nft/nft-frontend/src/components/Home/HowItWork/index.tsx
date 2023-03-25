import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'    
  },
  content: {
    width: '100%',
    // maxWidth: 1440,
    
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      backgroundSize: 'cover',
    },
    '& .left': {
      width: '100%',
      maxWidth: 1440,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundSize: '100% 100%',
      padding: 40,
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
      },
      '& h1': {
        fontSize: '3rem',
        marginBottom: 20,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 30,
        },
      },
      '& span': {
        fontSize: '1.8rem',
        marginBottom: 20,
        padding :'5px 20px',
        border : '3px #35ba33 solid',
        boxShadow : '0px 0px 8px #35ba33',
        [theme.breakpoints.down('sm')]: {
          fontSize : 20,
        },
      },
      '& ul': {
        width: '100%',
        display: 'flex',

        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },

        '& li': {
          color: '#000',
          width: '100%',
          height : 'auto',
          margin : 0,
          position: 'relative',
          // overflow : 'hidden',
          [theme.breakpoints.down('sm')]: {
            marginBottom : 20,
          },
          '& .img': {
            height : 80,
            margin : 'auto',
            marginBottom : 20,
            [theme.breakpoints.down('sm')]: {
              height : 50,
              marginBottom : 10,
            },
          },
          
          '& .arrow_img': {
            height : 50,
            opacity : 0.5,
            right : -40,
            top : 20,
            position : 'absolute',
            [theme.breakpoints.down('sm')]: {
              display : 'none'
            },
          },

          '& h2': {
            fontSize: '1.8rem',
            textAlign :'center',
            [theme.breakpoints.down('sm')]: {
              fontSize: 26,
            },
          },

          '& h3': {
            fontSize: '1.2rem',
            marginBottom: 20,
            textAlign :'center',
            [theme.breakpoints.down('sm')]: {
              fontSize: 20,
            },
          },

          '& p': {
            fontSize: '1rem',
            [theme.breakpoints.down('sm')]: {
              fontSize: 14,
            },
          },
          '& .text': {
            height : 'calc(100% - 100px)',
            padding : '0px 20px',
            marginTop: 0,
            marginBottom: 0,
            '@media screen and (max-width: 450px) and (orientation: portrait)': {
              height : 'calc(100% - 70px)',
            },
          },
          '& .borderRight': {
            borderRight : '3px #35ba3366 solid',
            [theme.breakpoints.down('sm')]: {
              border : 'none'
            },
          },
        },
        
      },
    },
    '& .right': {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
      maxWidth: 1440,
      
      padding: 40,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        alignItems: 'center',
      },
      '& h1': {
        color: '#000',
        fontSize: '3rem',
        marginBottom: 20,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 30,
        },
      },
      '& p': {
        color: '#000',
        marginBottom: 20,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 14,
        },
      },
      '& a': {
        color: '#44E5AD',
      },
    },
  },
}));

const tmpData = [
  {
    img : '/assets/images/how_01.png',
    title : 'Create Box',
    txt : 'Create your own Box now and start making decisions!'
  },
  {
    img : '/assets/images/how_03.png',
    title : 'Submit Proposal',
    txt : 'Submitted a proposal to raise and initiate production process.'
  },
  {
    img : '/assets/images/how_04.png',
    title : 'Voting',
    txt : "Tailor the voting process to your needs."
  } 
]

const HowItWork = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className="left">
          <h1>How It Works</h1>
          <span>FOR USERS</span>
          <ul>
            {tmpData.map((d, k)=>(
              <li key={k}>
                <img src={d.img} alt="" className='img' />
                {(k === 0 || k === 1 ) && <img src="/assets/images/how_arrow.png" alt="" className='arrow_img' />}
                <div className= {`text ${k === 0 || k === 1 ? 'borderRight' : ''}`}>
                  <h2>Step {k + 1}</h2>
                  <h3>{d.title}</h3>
                  <p>{d.txt}</p>
                </div>
              </li>
            ))}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
