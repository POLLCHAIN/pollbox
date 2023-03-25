import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import TinyBold from '../Typography/TinyBold';
import Tiny from '../Typography/Tiny';
import clsx from 'clsx';

interface FileInputProps {
  info?: string;
  label?: string;
  displayAsset?: boolean;
  defaultAsset?: string;
  defaultAssetType?: string;
  onChange?: Function;
  accept?: 'Image' | 'Video' | 'Audio' | 'All';
}

interface PT {
  fileAssetType: string;
}

const useStyles = makeStyles<Theme, PT>(theme => ({
  root: {},

  dropzone: {
    border: '1px solid white',
    borderStyle: 'dashed',
    height: props => (props.fileAssetType === 'Video' ? 'auto' : 300),
    width: '100%',
    background: 'transparent',
    // props => (props.fileAssetType === 'Video' ? 'transparent' : theme.palette.primary.main + '30')
    borderRadius: theme.shape.borderRadius,
    margin: 'auto',
    marginTop: '10px',
    // overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',

    '&:hover': {
      '& $fileButton': {
        opacity: 1,
      },
    },
  },
  icon: {
    color: '#00D9AC',
    marginLeft: 8,
  },
  fileOverlay: {
    position: 'absolute',
    margin: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50px)',
  },
  fileButton: {
    backgroundColor: 'transparent',
    border: '2px solid #00D9AC',
    padding: '12px 21px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    marginTop: props => (props.fileAssetType ? 0 : 30),
    opacity: 0,
    '&:active': {
      transform: 'scale(0.9)',
    },
    '& h5': {
      color: '#00D9AC',
    },
  },
  input: {
    display: 'none',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit : 'contain',
    borderRadius: '10px',
  },
}));

const UploadFile = forwardRef<Ref<any>, FileInputProps>(
  (
    {
      // info = 'PNG, GIF, WEBP, JPG',
      info = 'PNG, GIF, WEBP, MP4 or MP3, Max 1Gb',
      accept = 'All',
      label,
      displayAsset,
      defaultAsset,
      defaultAssetType,
      onChange,
    },
    ref,
  ) => {
    const [fileAsset, setFileAsset] = useState<string>(defaultAsset);
    const [fileAssetType, setFileAssetType] = useState<string>(defaultAssetType);
    //console.log(fileAssetType, fileAsset);
    const classes = useStyles({ fileAssetType });

    useEffect(() => {
      setFileAsset(defaultAsset);
      setFileAssetType(defaultAssetType);
    }, [defaultAsset, defaultAssetType]);

    function getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
    }

    function getAssetType(filename) {
      var ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'png':
          return 'Image';
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
          return 'Video';
        case 'mp3':
          return 'Audio';
      }
      return '';
    }

    function getAcceptType(accept) {
      switch (accept) {
        case 'Image':
          return 'image/*';
        case 'Video':
          return 'video/*';
        case 'Audio':
          return 'audio/*';
        case 'All':
          return 'image/*, audio/*, video/*';
      }
      return '';
    }

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      e.target.files.length > 0 && setFileAsset(URL.createObjectURL(e.target.files[0]));
      e.target.files.length > 0 && setFileAssetType(getAssetType(e.target.files[0].name));
    };

    return (
      <div className={classes.dropzone}>
        <div className={classes.fileOverlay}>
          {info && !fileAsset && <Tiny>{info}</Tiny>}
          <label className={clsx(classes.fileButton)}>
            <TinyBold>{label}</TinyBold>
            <CloudUploadIcon className={classes.icon} />
            <input className={classes.input} type="file" accept={getAcceptType(accept)} onChange={onChangeFile} />
          </label>
        </div>
        {fileAsset && displayAsset && fileAssetType === 'Image' && (
          <img className={classes.img} src={fileAsset} alt="" />
        )}
        {fileAsset && displayAsset && fileAssetType === 'Video' && (
          <>
            <video className={classes.img} controls>
              <source src={fileAsset} type="video/mp4" />
            </video>
          </>
        )}
        {fileAsset && displayAsset && fileAssetType === 'Audio' && (
          <audio className={classes.img} src={fileAsset} controls />
        )}
      </div>
    );
  },
);
export default UploadFile;
