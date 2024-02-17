#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (C) 2017 Mandiant, Inc. All Rights Reserved.

from pathlib import Path

import setuptools

requirements = [
    "tqdm==4.65.0",
    "rich==13.4.2",
]

# this sets __version__
# via: http://stackoverflow.com/a/7071358/87207
# and: http://stackoverflow.com/a/2073599/87207
file_path = Path("condense") / "version.py"
exec(file_path.read_text())


# via: https://packaging.python.org/guides/making-a-pypi-friendly-readme/
this_directory = Path(__file__).resolve().parent
readme_file = this_directory / "README.md"
long_description = readme_file.read_text()

pkgs = setuptools.find_packages()


setuptools.setup(
    name="condense",
    version=__version__,
    description="A tool to condense and analyze youtube videos",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Dhananjay Goel, Arnav Kharbanda, Arpit Kumar, Kritika Bansal, Virat Jain, Dhruv Singh Negi, Edgar Aditya, Niti Shyamsukha, Manik, Nandini, Vikalp",
    author_email="kharbandarnav@gmail.com, ...",
    url="https://github.com/Arker123/T07-CS305",
    packages=pkgs,
    package_dir={"condense": "condense"},
    entry_points={
        "console_scripts": [
            "condense=condense.main:main",
        ]
    },
    include_package_data=True,
    install_requires=requirements,
    extras_require={
        "dev": [
            "pyyaml==6.0.1",
            "pytest==8.0.0",
            "pytest-sugar==0.9.4",
            "pytest-instafail==0.5.0",
            "pytest-cov==4.1.0",
            "pycodestyle==2.11.1",
            "black==23.12.1",
            "isort==5.13.2",
            "mypy==1.8.0",
            # type stubs for mypy
            "types-PyYAML==6.0.10",
        ],
        "build": ["pyinstaller==6.3.0", "setuptools==69.0.3", "build==1.0.3"],
    },
    zip_safe=False,
    keywords="Condense, YouTube, Video, Analysis",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Artists",
        "Environment :: GPU :: NVIDIA CUDA :: 12 :: 12.1",
        "Environment :: Web Environment",
        "Intended Audience :: YouTube Users",
        "License :: OSI Approved :: Apache Software License",
        "Natural Language :: English",
        "Programming Language :: Python :: 3",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    python_requires=">=3.8",
)