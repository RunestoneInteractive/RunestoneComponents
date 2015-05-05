from setuptools import setup, find_packages

with open('requirements.txt', 'r') as fh:
    dependencies = [l.strip() for l in fh]

setup(
    name='runestone',
    version='0.1dev',
    author = 'Brad Miller',
    author_email = 'bonelake@mac.com',
    packages= find_packages(),
    install_requires=dependencies,
    include_package_data = True,
    zip_safe = False,
    package_dir = {'runestone' : 'runestone'},
    package_data = { '' : ['js/*.js', 'css/*.css', '*.txt']},
    license='GPL',
    url = 'https://github.com/RunestoneInteractive/RunestoneTools', 
    download_url = 'https://github.com/RunestoneInteractive/RunestoneTools/tarball/2.0a1', 
    keywords = ['runestone', 'sphinx', 'ebook'], # arbitrary keywords
    # data_files=[('common',['runestone/common/*']),
    #             ('project/template', ['newproject_copy_me/*'])
    # ],
    long_description=open('README.txt').read(),
    entry_points = {
        'console_scripts': [
            'runestone = runestone.__main__:main'
        ]
        }
)